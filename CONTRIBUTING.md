# Contributing

The provided `_CONTRIBUTING.md` advocates for a `git rebase` based workflow
instead of a `git merge` based workflow. The advantage of a `rebase` based
workflow over `merge` is that a rebase, even one which fixes conflicts, does
not introduce a new commit into your history. If you use `merge` and there are
any conflicts, then you will get a new "merge commit" in your history. Over
time, you can accrue hundreds of merge commits which can make your history
significantly harder to read and introduce a much lower signal to noise ratio
in your history. `rebase` avoids these problems by changing existing commits
instead of creating a new one.

Because `rebase` changes commits, you will have to push with the `-f` or
`--force` flag to your branch after rebasing, as the history has changed in a
way that git cannot resolve. You should _never_ rebase or push with force to
the `master` branch of your repository, as that will invalidate everyone elses
clones and checkouts of the repository.

Though it advocates for a slightly different version of the rebase workflow, the article, [A romance of a single dimension: linear git history in practice](http://www.thumbtack.com/engineering/linear-git-history/) does an excellent job of justifying the practice. I strongly recommend reading it, even if you choose a different option.

##### Example Workflow Diagram

![](http://i.imgur.com/9LjEpWh.png)

#### Commit Message Guidelines

- Commit messages should be written in the present tense; e.g. "Fix continuous
  integration script".
- The first line of your commit message should be a brief summary of what the
  commit changes. Aim for about 70 characters max. Remember: This is a summary,
  not a detailed description of everything that changed.
- If you want to explain the commit in more depth, following the first line should
  be a blank line and then a more detailed description of the commit. This can be
  as detailed as you want, so dig into details here and keep the first line short.

Thanks for contributing!
