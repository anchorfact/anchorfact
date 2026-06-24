const OFFICIAL_SITE = 'https://anchorfact.org';

function publicUrl(path, site = OFFICIAL_SITE) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${String(site || OFFICIAL_SITE).replace(/\/+$/, '')}${normalizedPath}`;
}

const READINESS_RUNTIME_INPUTS = [
  {
    id: 'production_integrity',
    report_field: 'production_health',
    json_flag: '--production-integrity-json',
    command: 'npm run production:integrity -- --write-json reports/production-integrity.json',
    status_when_missing: 'not_provided',
    required_fields: ['ok', 'checks', 'commit_sha', 'source_commit_sha']
  },
  {
    id: 'ai_adoption',
    report_field: 'adoption_signal',
    json_flag: '--adoption-json',
    command: 'npm run usage:adoption -- --lookback-minutes 1430 --write-json reports/ai-adoption-scorecard.json',
    status_when_missing: 'not_provided',
    preferred_measurement_scope: 'interactive_ai',
    required_fields: [
      'identified_ai_primary_to_discovery_ratio',
      'identified_ai_primary_to_discovery_target_status',
      'interactive_ai_primary_to_discovery_ratio',
      'interactive_ai_primary_to_discovery_target_status',
      'crawler_ai_primary_to_discovery_ratio'
    ]
  },
  {
    id: 'design_partners',
    report_field: 'design_partner_signal',
    json_flag: '--design-partners-json',
    command: 'npm run api:readiness -- --design-partners-json reports/design-partners.json',
    status_when_missing: 'manual_validation_required',
    manual_validation: true,
    required_fields: ['external_design_partner_count', 'paid_intent_signal_count']
  }
];

const BLOCKER_EVIDENCE_DEFAULTS = {
  production_integrity_14_day: {
    gate_type: 'automated_window',
    target: '14 consecutive days production:integrity passing and AI eval 100%',
    required_days: 14,
    runtime_input_id: 'production_integrity'
  },
  public_audit_14_day: {
    gate_type: 'automated_window',
    target: '14 consecutive days with 0 move_to_draft / repair_sources public audit findings',
    required_days: 14,
    runtime_input_id: 'content_health',
    command: 'npm run content:health -- --json --write reports/content-health.json'
  },
  ai_primary_discovery_ratio_7_day: {
    gate_type: 'automated_window',
    target: '>=0.2 primary/discovery ratio for 7 consecutive days',
    required_days: 7,
    runtime_input_id: 'ai_adoption'
  },
  design_partners: {
    gate_type: 'manual_validation',
    target: '>=3 real external design partners and >=1 paid-intent signal',
    runtime_input_id: 'design_partners'
  }
};

function cloneRuntimeInput(input) {
  return {
    ...input,
    required_fields: [...(input.required_fields || [])]
  };
}

function definedObject(input) {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined && value !== null)
  );
}

function blockerEvidenceRequirement(gate, runtimeSignalContract) {
  const defaults = BLOCKER_EVIDENCE_DEFAULTS[gate.id] || { gate_type: 'automated_window' };
  const runtimeInput = (runtimeSignalContract.runtime_inputs || [])
    .find(input => input?.id === defaults.runtime_input_id) || null;

  return definedObject({
    id: gate.id,
    gate_type: defaults.gate_type,
    status: gate.status,
    target: gate.target || defaults.target,
    required_days: gate.required_days ?? defaults.required_days,
    runtime_input_id: defaults.runtime_input_id,
    report_field: runtimeInput?.report_field,
    json_flag: runtimeInput?.json_flag,
    command: runtimeInput?.command || defaults.command,
    history_command: runtimeSignalContract.history_command,
    status_when_missing: runtimeInput?.status_when_missing,
    preferred_measurement_scope: runtimeInput?.preferred_measurement_scope,
    manual_validation: runtimeInput?.manual_validation,
    required_fields: runtimeInput?.required_fields
      ? [...runtimeInput.required_fields]
      : undefined
  });
}

export function buildReadinessRuntimeSignalContract({ site = OFFICIAL_SITE } = {}) {
  return {
    static_artifact: true,
    status_when_missing: 'not_provided',
    purpose: 'Static /api-readiness.json publishes corpus and API readiness. Production integrity, traffic adoption, and design partner signals require runtime JSON inputs.',
    workflow: '.github/workflows/readiness-scorecard.yml',
    scorecard_command: 'npm run api:readiness -- --adoption-json reports/ai-adoption-scorecard.json --production-integrity-json reports/production-integrity.json --write reports/api-readiness.md --write-json reports/api-readiness.json',
    history_command: 'npm run readiness:history -- --history-dir reports/readiness-history --api-readiness-json reports/api-readiness.json --content-health-json reports/content-health.json --save-current --write reports/readiness-window.md --write-json reports/readiness-window.json',
    published_static_artifact: publicUrl('/api-readiness.json', site),
    runtime_inputs: READINESS_RUNTIME_INPUTS.map(cloneRuntimeInput)
  };
}

export function buildReadinessBlockerEvidenceRequirements({
  gates = [],
  runtimeSignalContract = null,
  site = OFFICIAL_SITE
} = {}) {
  const contract = runtimeSignalContract || buildReadinessRuntimeSignalContract({ site });
  return gates.map(gate => blockerEvidenceRequirement(gate, contract));
}

export function buildReadinessRuntimeSignalSummary({
  contract = null,
  site = OFFICIAL_SITE
} = {}) {
  const runtimeContract = contract || buildReadinessRuntimeSignalContract({ site });
  const runtimeInputs = Array.isArray(runtimeContract.runtime_inputs)
    ? runtimeContract.runtime_inputs
    : [];
  const adoptionInput = runtimeInputs.find(input => input?.id === 'ai_adoption') || null;
  return {
    status_endpoint: '/api-readiness.json',
    static_artifact: runtimeContract.static_artifact === true,
    missing_runtime_status: runtimeContract.status_when_missing || 'not_provided',
    workflow: runtimeContract.workflow || '.github/workflows/readiness-scorecard.yml',
    scorecard_command: runtimeContract.scorecard_command || null,
    history_command: runtimeContract.history_command || null,
    published_static_artifact: runtimeContract.published_static_artifact || publicUrl('/api-readiness.json', site),
    runtime_input_ids: runtimeInputs.map(input => input?.id).filter(Boolean),
    preferred_adoption_scope: adoptionInput?.preferred_measurement_scope || null,
    manual_validation_required: runtimeInputs
      .filter(input => input?.manual_validation)
      .map(input => input.id)
  };
}
