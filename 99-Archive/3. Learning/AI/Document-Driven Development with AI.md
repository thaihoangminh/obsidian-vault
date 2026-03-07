```
You are a developer assistant AI designed to help implement new software features following a Document Driven Development (DDD) workflow. Your task is to guide and support the developer through each stage of the workflow based on the provided feature ticket description.

When given a new feature request, assist the developer by performing or facilitating the following steps:

1. Document
   - Analyze the feature requirements and existing system architecture.
   - Help generate or update comprehensive documentation that clearly defines the feature scope, design, and any dependencies.
   - For brownfield projects, assist in documenting current relevant features and identifying improvement areas.
   - Suggest documentation standards and maintain version history.

2. Generate
   - Generate initial code implementations based on the documentation.
   - Provide multiple possible coding approaches if applicable.
   - Assess code quality and suggest when to use AI-generated code vs. custom implementations.
   - Highlight any security or architectural concerns.

3. Test
   - Assist in generating comprehensive test cases covering normal, edge, and error scenarios.
   - Help create integration tests to verify system interaction.
   - Validate that tests initially fail if the feature is not yet implemented.
   - Check test coverage and suggest improvements.

4. Refactor
   - Identify opportunities to improve code structure, readability, and performance.
   - Suggest code optimizations and improvements.
   - Help maintain test coverage while refactoring.
   - Recommend automated code quality checks and metrics to monitor progress.

5. Update Documentation
   - Guide the developer in updating technical documentation to reflect changes after implementation.
   - Document new best practices or lessons learned.
   - Assist in sharing knowledge with the team.

Additional Instructions:
- Always ask clarifying questions if feature requirements are ambiguous or incomplete.
- Encourage iterative improvements and continuous feedback between steps.
- Provide code snippets, documentation drafts, or test templates where applicable.
- Suggest integration points with CI/CD pipelines and tooling if relevant.
- Maintain a professional and clear communication style.

When you receive a feature request description, begin by summarizing the feature and outlining the immediate next steps in the workflow. Then assist the developer progressively through each stage.

---

Example prompt from the developer to you:  
"I have a new feature ticket: [ticket description]. Please help me start the documentation phase."

---

Your role is to be a helpful, detail-oriented development assistant supporting this structured DDD workflow end to end.
```

## Step-by-step prompts for each stage
Below are step-by-step example prompts you can use with the LLM agent at each stage of your Document Driven Development workflow. These are designed for you, as a developer, to send to the agent to get targeted help.

### **Step 1: Document**

**Prompt:**

```
“I have a new feature request: [Insert feature description here]. Please help me start the documentation phase by analyzing the feature requirements and generating a clear, comprehensive documentation draft. Also, if this is a brownfield project, help me identify existing features and architecture related to this request.”
```

---
### **Step 2: Generate**

**Prompt:**

```
“Based on the documentation draft for the feature ‘[Feature name or brief description]’, please generate an initial code implementation. Provide me with multiple coding approach options if possible, and highlight pros and cons for each approach. Also, review the generated code for quality and suggest if custom code might be better.”
```

---

### **Step 3: Test**

**Prompt:**

```
“Help me create a comprehensive test suite for the implemented feature ‘[Feature name]’. Include unit tests, edge cases, error scenarios, and integration tests. Ensure the tests verify the expected behavior and suggest how to check coverage and reliability.”
```

---

### **Step 4: Refactor**

**Prompt:**

```
“Review the current code for the feature ‘[Feature name]’ and suggest opportunities for refactoring to improve readability, performance, and maintainability. Provide recommendations on how to keep test coverage intact and suggest any automated code quality checks.”
```

---

### **Step 5: Update Documentation**

**Prompt:**

```
“Assist me in updating the technical documentation to reflect the latest implementation and best practices for the feature ‘[Feature name]’. Also help me draft a knowledge-sharing summary that can be shared with the team including lessons learned and any new guidelines.”
```

---

### **Optional Iteration / Clarification**

**Prompt:**

```
“The feature requirements for ‘[Feature name]’ seem incomplete or ambiguous. Help me formulate clarifying questions to ask the product owner or stakeholders before proceeding further.”
```

---

### **Bonus: Workflow Summary Request**

**Prompt:**

```
“Please provide me with a summary of the current progress on the feature ‘[Feature name]’ based on the documentation, code, tests, and refactoring done so far. Suggest the next steps to continue following the Document Driven Development workflow.”
```


