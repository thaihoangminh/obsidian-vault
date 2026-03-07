Read this github issue: {github issue link} 

Once you have understood the issue, first read the existing testing code and find a good place to add one or more new tests that fail, demonstrating that the issue exists.

Do NOT write any code to fix the issue until you have written a test reproducing the issue and confirmed that it fails when running. If you are not able to reproduce the issue, ask me for help.


```
Please use the github API to read this issue:
https://github.com/All-Hands-AI/OpenHands/issues/4480

Diagnose the problem, and fix it according to the following procedure:
1. Explore the codebase to find a likely location where the problem is occurring
2. Install the project dependencies using `INSTALL_DOCKER=0 make build`
3. Write a test that should fail if the problem is not addressed
4. Run tests according to the `py-unit-tests.yml` github workflow to make sure
   that this newly written test fails as expected
5. Fix the issue, and re-run tests to confirm that the tests now pass
6. If everything is working and you are confident you fixed the error, send a PR
   to the GitHub repo
7. Wait 90 seconds and then use the GitHub API to check if github actions are
   passing. If not, fix the errors

