import * as esbuild from "esbuild-wasm";
import axios from "axios";
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
        //check if there were relative paths  and modify the URL to make it a valid URL
        if (args.path.includes("./") || args.path.includes("../")) {
          return {
            namespace: "a",
            path: new URL(args.path, args.importer + "/").href,
          };
        }
        return {
          namespace: "a",
          path: `https://unpkg.com/${args.path}`,
        };
        // else if (args.path === "tiny-test-pkg") {
        //   return {
        //     path: "https://unpkg.com/tiny-test-pkg@1.0.0/index.js",
        //     namespace: "a",
        //   };
        // }
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              const message = require('medium-test-pkg');
              console.log(message);
            `,
          };
        }
        const { data } = await axios.get(args.path);
        return {
          loader: "jsx",
          contents: data,
        };
      });
    },
  };
};
