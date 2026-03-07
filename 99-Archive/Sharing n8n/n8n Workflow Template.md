Copy and paste the bellow template to a new n8n Workflow:

{
  "nodes": [
    {
      "parameters": {
        "url": "https://api.github.com/repos/thaihoangminh/n8n-demo/pulls/1",
        "authentication": "genericCredentialType",
        "genericAuthType": "httpHeaderAuth",
        "sendHeaders": true,
        "headerParameters": {
          "parameters": [
            {
              "name": "Accept",
              "value": "application/vnd.github.v3.diff"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4.2,
      "position": [
        -100,
        -340
      ],
      "id": "620bfe11-1937-465e-acb4-887c4968f3c7",
      "name": "Get Git diff",
      "credentials": {
        "httpHeaderAuth": {
          "id": "Q5vdBNGdd3QOOIGw",
          "name": "Header Auth account"
        }
      }
    },
    {
      "parameters": {
        "authentication": "oAuth2",
        "select": "channel",
        "channelId": {
          "__rl": true,
          "value": "C06DG9G4LT1",
          "mode": "list",
          "cachedResultName": "general"
        },
        "text": "={{ $json.text }}",
        "otherOptions": {
          "mrkdwn": false
        }
      },
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2.3,
      "position": [
        540,
        -340
      ],
      "id": "dcde70e6-688f-45e9-8491-c3679fbe87f9",
      "name": "Send Results",
      "webhookId": "da02cbac-74f3-4a95-819b-1927664eb0f2",
      "alwaysOutputData": false,
      "credentials": {
        "slackOAuth2Api": {
          "id": "WVm27T48InmjJHVY",
          "name": "Slack account"
        }
      }
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "=You are a world-class software engineer reviewing the Git diff provided and perform the following actions:\n\n1. Review the code according to these criteria:\n1.1. Code quality and adherence to TypeScript, JavaScript best practices\n1.2. Potential bugs, logic errors, or unhandled edge cases\n1.3. Performance implications and opportunities for optimization\n1.4. Code readability, structure, and long-term maintainability\n1.5. Any security vulnerabilities or unsafe coding patterns\n\n(If improvements are needed, include the revised code snippets with your suggestions and explain the rationale behind each change.)\n\nGit diff:\n{{ $json.data }}\n\nThe output markdown style should follow Slack markdown guidelines. Code suggestions should be wrapped in triple backticks, e.g. ```export const hello = () => {}```"
      },
      "type": "@n8n/n8n-nodes-langchain.chainLlm",
      "typeVersion": 1.5,
      "position": [
        140,
        -340
      ],
      "id": "62c09852-865c-4537-9fac-087df95ea967",
      "name": "Basic LLM Chain"
    },
    {
      "parameters": {},
      "type": "n8n-nodes-base.manualTrigger",
      "typeVersion": 1,
      "position": [
        -380,
        -340
      ],
      "id": "725b01f8-c9dd-47c6-81c2-bffb4101e224",
      "name": "Review Code Workflow"
    },
    {
      "parameters": {
        "model": "qwen2.5-coder:32b",
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.lmOllama",
      "typeVersion": 1,
      "position": [
        140,
        -140
      ],
      "id": "51151830-1515-4460-96c4-63ffa86c5444",
      "name": "Ollama",
      "credentials": {
        "ollamaApi": {
          "id": "qjmemAvc1fRnrGse",
          "name": "Ollama account"
        }
      }
    }
  ],
  "connections": {
    "Get Git diff": {
      "main": [
        [
          {
            "node": "Basic LLM Chain",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Basic LLM Chain": {
      "main": [
        [
          {
            "node": "Send Results",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Review Code Workflow": {
      "main": [
        [
          {
            "node": "Get Git diff",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Ollama": {
      "ai_languageModel": [
        [
          {
            "node": "Basic LLM Chain",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "e82cdd21bfad749d64954f1c5dbd24e29acd32413d77d6ce30a68711ac3b90ed"
  }
}