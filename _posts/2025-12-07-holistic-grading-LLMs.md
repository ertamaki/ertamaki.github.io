# Teaching Machines to Grade Like Humans: Replicating Holistic Coding with LLMs

There's a quiet problem in the social sciences that rarely makes headlines but shapes entire research agendas: how do you reliably measure something as slippery as the *tone* of a political speech? Let alone the latent ideas woven through it — constructs that don't announce themselves with convenient keywords but emerge from the interplay of rhetoric, framing, and narrative across an entire text.

For years, the gold standard has been **holistic grading**[^1]: trained human coders read an entire speech, internalize a rubric, study calibrated examples, and then assign a score that captures the overall character of the text. It works. It's also expensive, slow, and nearly impossible to scale across hundreds of languages and thousands of speeches. I recently led the technical design behind a research effort that asks: can Large Language Models learn to do this?

The short answer is yes — but the interesting part is *how*.

## What Holistic Grading Actually Is

If you've ever had an essay graded, you've experienced something close to holistic grading. A teacher doesn't count your commas or tally keywords. They read the whole piece, hold a mental model of what "good" looks like at each score level, and assign a grade that reflects the overall quality. It's inherently subjective, but when multiple trained graders converge on the same score, it becomes a surprisingly robust measurement tool.

In political science, this approach is used to code speeches along various dimensions — say, how much a speech appeals to "the people" versus "the elite," or how strongly it frames politics as a moral struggle between good and evil. The coders don't just search for buzzwords. They assess the speech as a whole, weighing how different rhetorical elements interact across the full text.

The training process is key. Human coders study a detailed rubric, work through anchor speeches (examples pre-scored by experts at specific points along the scale), discuss disagreements, and gradually calibrate their judgment until they reach acceptable inter-coder reliability. It's a structured apprenticeship in interpretive reasoning.

## Replicating the Training, Not Just the Task

Most applications of LLMs to text classification take a shortcut: hand the model a definition and some labels, and ask it to classify. That can work for straightforward categories, but holistic grading is different. The score isn't just about whether a feature is present — it's about the *degree* and *interplay* of features across an entire document. Context matters. Nuance matters.

Our approach in [the paper](https://arxiv.org/abs/2510.07458) was to mirror the human training pipeline as closely as possible. Instead of simply prompting an LLM with "rate this speech from 0 to 2," we adapted the same documentation that human coders receive — the rubric, the conceptual framework, the anchor examples — into a structured chain-of-thought prompt. The model was asked to reason step by step through different dimensions of the text before arriving at a final score, much like a human coder would mentally walk through the rubric while reading.

This is a subtle but important distinction. We weren't just asking the LLM to perform a task; we were asking it to *undergo a compressed version of the same training process* that produces reliable human coders. The rubric provides the interpretive framework. The anchor speeches provide calibration points. The chain-of-thought structure forces the model to show its reasoning rather than jumping to a number.

## What Worked (and What Didn't)

The results were encouraging. The best-performing models approximated human coders with impressive fidelity, preserving the rank ordering of speeches across different categories. But we also discovered a systematic issue: **scale compression**. Most models tended to push low scores upward and pull high scores downward, clustering their outputs toward the middle of the scale.

This is a fascinating failure mode. It suggests that LLMs, when uncertain, hedge toward the center — a kind of statistical conservatism. They get the relative ordering right (this speech is more X than that one) but struggle with the absolute calibration (exactly *how much* more). For many research purposes, rank ordering is enough. But if you need precise scores, this compression has to be addressed.

## Building a Tool to Fix the Hard Parts

That's where the second piece of this work comes in. Alongside the paper, I built [LLM_GPD](https://github.com/ertamaki/LLM_GPD), an open-source framework designed to tackle the practical challenges of deploying holistic grading with LLMs at scale.

The core insight behind the tool is that the standard Retrieval-Augmented Generation (RAG) approach — find similar examples, feed them to the model — isn't enough for this task. When you retrieve speeches that are *topically* similar, you often get examples that share a subject matter but not a rhetorical style. A speech about economic inequality isn't automatically high on any particular rhetorical dimension just because another speech about economic inequality scored high. This is what I call the **topic confusion problem**.

The framework addresses this with a few key design choices. First, it uses **ensemble embeddings** — three different embedding models that capture different semantic dimensions of the text. This reduces the risk of any single model's biases dominating the retrieval. Second, it implements **hybrid retrieval**, pulling both similar *and* dissimilar examples. The similar ones guide the model; the dissimilar ones calibrate it by showing what other score levels look like. Third, a **cross-encoder re-ranking** step distinguishes rhetorical patterns from mere topical overlap, pushing genuinely relevant examples to the top.

Finally, a **score fusion** mechanism combines outputs from across the ensemble to reduce individual model bias. This is particularly important when working with very small training sets — in our case, as few as nine anchor speeches.

## The Bigger Picture

This work sits at an interesting intersection. On one side, there's a growing push to use LLMs as cheap replacements for human coders in content analysis. On the other, there's justified skepticism: can a language model really replicate the nuanced, context-dependent judgment that holistic grading requires?

I think the answer is: not out of the box, but with the right scaffolding, yes. The key is to stop treating LLMs as black-box classifiers and start treating them as *trainees* — agents that need the same structured guidance, calibration examples, and reasoning frameworks that human coders receive. When you replicate the training process, not just the final task, you get results that are not only more accurate but also more interpretable. The chain-of-thought output lets you see *why* the model assigned a particular score, which is essential for research credibility.

There are still open questions. Scale compression remains a challenge. The approach needs to be tested across more languages and domains. And there's a deeper question about whether we're measuring the same construct when a machine does the grading versus a human — a validity question that deserves serious attention.

But as a proof of concept, the results suggest that holistic grading — one of the most human-intensive methods in the social science toolkit — can be meaningfully automated. Not by replacing human judgment, but by teaching machines to approximate the process through which that judgment is formed.

---

*The paper, "Populism Meets AI," is available on [arXiv](https://arxiv.org/abs/2510.07458). The LLM_GPD framework is open-source on [GitHub](https://github.com/ertamaki/LLM_GPD).*

[^1]: Yes, there are dictionary-based and keyword-counting approaches. No, we will not be discussing them. Counting how many times a speaker says "the people" to measure a latent ideological construct is the content analysis equivalent of diagnosing a fever by checking if someone *looks* warm. They exist. I do not accept their existence.
