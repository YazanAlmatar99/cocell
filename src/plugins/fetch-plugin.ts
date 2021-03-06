import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

//CACHE
const fileCache = localForage.createInstance({
  name: "filecache",
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        //this will avoiding esbundle trying to access file system
        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: inputCode,
          };
        }

        //Check to see if we have already fetched this file and it is in the cash
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        //if it is in cash then return immediatly
        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path);
        //store response in cache

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        //Store response in cache
        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
