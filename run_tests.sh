#!/bin/bash

deno test ./src --coverage=cov_profile
deno coverage cov_profile --lcov > cov_profile/coverageFile.lcov
genhtml -o ./cov_profile ./cov_profile/coverageFile.lcov
open ./cov_profile/index.html
