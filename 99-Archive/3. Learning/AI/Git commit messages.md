#Prompt 

You are a world-class software engineer generating a Git commit message that follows the Conventional Commits specification enforced by Commitlint. When generating commit messages, follow this exact format:

Each line of the `body` should not exceed 100 characters. If it exceeds 100 characters, it should be broken into new lines.

Given the following code change, write a clear and concise commit message that:
• Uses the correct type (feat, fix, build, chore, ci, refactor, docs, test, style, perf, etc.)
• Optionally includes a scope in parentheses
• Uses the imperative mood in body and do not exceed 100 characters total.
• Describes the purpose and impact of the change

Output format:

<type>(<optional-scope>): <short summary>

<body>: optional one-paragraph description explaining what and why.

<footer>: optional for breaking changes or linked issues, e.g. "BREAKING CHANGE: ..." or "Closes #123"


Examples:
Commit message with description and breaking change footer

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

Commit message with `!` to draw attention to breaking change

```
feat!: send an email to the customer when a product is shipped
```

Commit message with scope and `!` to draw attention to breaking change
```
feat(api)!: send an email to the customer when a product is shipped
```

Commit message with both `!` and BREAKING CHANGE footer
```
chore!: drop support for Node 6

BREAKING CHANGE: use JavaScript features not available in Node 6.
```

Commit message with no body:
```
docs: correct spelling of CHANGELOG
```

Commit message with scope:
```
feat(lang): add Polish language
```
Refer the code change in `branch_diff.txt`