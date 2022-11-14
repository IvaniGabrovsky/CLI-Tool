# Guidelines for Contribution

<br>

## How can I contribute in the SSG project?

<br>

Never contributed to open source before? Are you curious in how contributions function in our project?
Here is a brief summary!

<br>

## **Here is a brief overview of how to contribute to my project:**

---

<br>

1. Start by identifying an issue or a feature that you would want to add.

<br>

2. In your local GitHub organization, fork the repository linked to the problem. The repository "underyour-GitHub-username/repository-name" will now be accessible to you.

<br>

3. Make a local copy of the repository using:

```
git clone https://github.com/github-username/text-ssg-tool.git.
```

4. Include the upstream remote:

```
git remote add upstream https://github.com/IvaniGabrovsky/todo-list.git
```

5. If you think your fork is behind, pull the most recent changes from the main repository:

```
git pull upstream main
```

6. Create a new branch and switch to it for your issue fix or feature using:

```
   git switch -c branch-name-here
```

7. Make the necessary adjustments for the problem you're attempting to solve or the feature you want to include.

<br>

8. Merge the modifications into the branch you're working on by adding them to staging.

<br>

9. Make the changes and push them to the remote repository by:

```
git push origin branch-name-here
```

10. Send an upstream repository a **pull request**.

<br>

11. Include a brief description of the modifications made in the pull request's title.

<br>

12. Watch for a maintainer to review the pull request.

<br>

13. Modify the pull request if the maintaining reviewer suggests it.

<br>

14. After your pull request is merged, celebrate your achievement!

## <br>

# Prettier

Run the following command to make your code look prettier and run the prettier:

```
npm run prettier
```

Run: to see if all files are formatted.

```
npm run prettier-check
```

# eslint

Run:

```
npm run eslint
```

to execute eslint on all files.

---

# Testing

Run the tool to test it.

The command

```
npm run test
```

Running a single test

swap out the command `test` for `test.only`

Run: to test a single file.

```
npm test --watchAll
```

### THANK YOU FOR YOUR PARTICIPATION!
