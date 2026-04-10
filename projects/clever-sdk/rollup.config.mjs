import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import resolve from "@rollup/plugin-node-resolve";

export default [
    {
        // 生成未压缩的 JS 文件
        input: "src/index.ts",
        output: [
            {
                file: "dist/CleverSDK.mjs",
                format: "esm",
                name: "CleverSDK",
            },
            {
                file: "dist/CleverSDK.js",
                format: "umd",
                name: "CleverSDK",
            },
        ],
        plugins: [
            resolve(),
            typescript({
                tsconfig: "./tsconfig.json",
                importHelpers: false,
                compilerOptions: {
                    target: "es6",
                    module: "es6",
                    experimentalDecorators: true, // 启用ES装饰器。
                    strict: true,
                    strictNullChecks: false,
                    moduleResolution: "Node",
                    skipLibCheck: true,
                    esModuleInterop: true,
                },
            }),
        ],
    },
    {
        // 生成压缩的 JS 文件
        input: "src/index.ts",
        external: ["cc", "fairygui-cc"],
        output: [
            {
                file: "dist/CleverSDK.min.mjs",
                format: "esm",
                name: "CleverSDK",
            },
            {
                file: "dist/CleverSDK.min.js",
                format: "umd",
                name: "CleverSDK",
            },
        ],
        plugins: [
            resolve(),
            typescript({
                tsconfig: "./tsconfig.json",
                importHelpers: false,
                compilerOptions: {
                    target: "es6",
                    module: "es6",
                    experimentalDecorators: true, // 启用ES装饰器。
                    strict: true,
                    strictNullChecks: false,
                    moduleResolution: "Node",
                    skipLibCheck: true,
                    esModuleInterop: true,
                },
            }),
            terser(),
        ],
    },
    {
        // 生成声明文件的配置
        input: "src/index.ts",
        output: {
            file: "dist/CleverSDK.d.ts",
            format: "es",
        },
        plugins: [
            dts({
                compilerOptions: {
                    stripInternal: true,
                },
            }),
        ],
    },
];
