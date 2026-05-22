---
id:"kb-2026-00267"
title:"Neural Network Basics"
schema_type:"TechArticle"
category:"ai"
language:"en"
confidence:"high"
last_verified:"2026-05-22"
generation_method:"ai_assisted"
ai_models:["claude-opus"]
derived_from_human_seed:true
primary_sources:
  - title:"Deep Learning (Goodfellow, Bengio, Courville)"
    type:"book"
    year:2016
    url:"https://www.deeplearningbook.org/"
    institution:"MIT Press"
completeness:0.82
ai_citations:
  last_citation_check:"2026-05-22"
---

## TL;DR

Neural networks are computing systems inspired by biological neurons: layers of interconnected nodes that transform input data through weighted connections and activation functions. A simple feedforward network: Input Layer → Hidden Layer(s) → Output Layer. Each neuron computes weighted sum + bias + activation function.

## Core Explanation

Activation functions: ReLU (most common), sigmoid (binary out), tanh (-1 to 1), softmax (multi-class probability). Training: forward pass computes output, backward pass (backpropagation) updates weights via gradient descent. Universal Approximation Theorem: a single hidden layer can approximate any continuous function (given enough neurons).

## Further Reading

- [Deep Learning (Goodfellow, Bengio, Courville)](https://www.deeplearningbook.org/)
