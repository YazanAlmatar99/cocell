import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

//CACHE
const fileCache = localForage.createInstance({
  name: "filecache",
});

export const unpkgPathPlugin = () => {
  return {
    //for debugging purposes
    name: "unpkg-path-plugin",
    //build represents the bundling process
    setup(build: esbuild.PluginBuild) {
      //the plugin will overwrites esbuild natural behavior to make it possible to
      //run in the browswer because it was designed to run on a file system
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResole", args);
        if (args.path == "index.js") {
          return { path: args.path, namespace: "a" };
        }

        //It handles the resolutoin of relative files
        //check if there were relative paths  and modify the URL to make it a valid URL
        if (args.path.includes("./") || args.path.includes("../")) {
          return {
            namespace: "a",
            path: new URL(
              args.path,
              "https://unpkg.com" + args.resolveDir + "/"
            ).href,
          };
        }
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              import React from 'react-select';
\              console.log(react,useState);
            `,
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
