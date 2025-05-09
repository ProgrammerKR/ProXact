# Test fixture for `packages/proxact-devtools-scheduling-profiler`

1. First, run the fixture:
```sh
# In the root directory
# Download the latest *experimental* React build
scripts/release/download-experimental-build.js

# Run this fixtures
fixtures/devtools/scheduling-profiler/run.js
```

2. Then open [localhost:8000/](http://localhost:8000/) and use the Performance tab in Chrome to reload-and-profile.
3. Now stop profiling and export JSON.
4. Lastly, open [proxact-scheduling-profiler.vercel.app](https://proxact-scheduling-profiler.vercel.app/) and upload the performance JSON data you just recorded.