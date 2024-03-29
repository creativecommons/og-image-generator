# Contributing to CC Open Source

Thank you for your interest in contributing to CC Open Source! This document is
a set of guidelines to help you contribute to this project.


## Code of Conduct

By participating in this project, you are expected to uphold our [Code of
Conduct][code_of_conduct].

[code_of_conduct]: https://opensource.creativecommons.org/community/code-of-conduct/


## Project Documentation

The `README` in the root of the repository should contain or link to project
documentation. If you cannot find the documentation you're looking for, please
file a GitHub issue with details of what you'd like to see documented.


## How to Contribute

Please follow the processes in our general [Contributing Code][contributing]
guidelines on the Creative Common Open Source website.

[contributing]: https://opensource.creativecommons.org/contributing-code/


### Bugs

If you find a bug, please open an issue in this repository describing the bug.
You can file a bug
[here](https://github.com/creativecommons/og-image-generator/issues/new?template=bug_report.md).
You will see a bug report template with the required information you should
provide.

After that, don't forget to tag the issue with the "Bug" label.


### Proposing changes or new features

If you have an idea of a new feature or change to how the CC Search frontend
works, please [file an issue][featurereq] so we can discuss the possibility of
that change or new feature being implemented and released in the future. This
lets us come to an agreement about the proposed idea before any work is done.

If you'd like to build a new feature but don't have a specific idea, please
check our [public roadmap][roadmap]. Choose something from the pipeline of
ideas and follow the same process as above.

[featurereq]: https://github.com/creativecommons/og-image-generator/issues/new?template=feature_request.md
[roadmap]: https://docs.google.com/document/d/19yH2V5K4nzWgEXaZhkzD1egzrRayyDdxlzxZOTCm_pc/


### Pull requests

Before you start writing code, make sure there is an issue open. Pull requests
without a link to an existing issue won't be merged. All pull requests _must_
target the `develop` branch of the repository.

If you want to get started contributing code to this project but don't know
exactly what to work on, we compiled a good list of issues labeled as [Good
first issues][firstissue] which are small in scope and not so complex to solve.
There is also issues labeld as [Help wanted][helpwanted] which can be a bit
more complex but are good examples of thigns we are currently accepting help
from the community.

Any code modifications will have to be accompanied by the appropriate unit
tests. This will be checked and verified during code review. Once the Pull
Reques is opened, our CI server will run the unit test suite and run a code
linter to verify that the code follows the coding guidelines.

If you want to run the unit tests and linter on your machine, run the following commands:

`npm run unit` for unit tests

`npm run lint` for linter.

You can also configure your editor of choice with a ESLint plugin so you can
get the linter feedback as you write code.

[firstissue]: https://github.com/creativecommons/og-image-generator/labels/good%20first%20issue
[helpwanted]: https://github.com/creativecommons/og-image-generator/labels/help%20wanted


## Questions or Thoughts?

Talk to us on [one of our community forums][community].

[community]: https://opensource.creativecommons.org/community/
