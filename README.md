# Test app for Agro1

Packages/modules used are all available in `package.json`.

## How to view this app

1. Install all `npm` modules
  ```shell
  npm install
  ```

2. There are two configured scripts for building the project's assets:
  * **Building for development**

    Will build all files to `build` folder, and keep a `watch` active, listening for changes
    ```shell
    npm run dev
    ```

  * **Building for production**

    This will clean `build` folder and compile everything in hashed files for optimized caching purposes
    ```shell
    npm run build
    ```

3. Open `index.html` file from inside of `build` folder, **NOT** the one from the project root, as it will not work. The file is injected with the compiled file names according to the option chosen above and the appropriate hases (if any).

## Finalizing

As requested to use SQLite, this app uses WebSQL, available in many browsers (though deprecated).

Angular files (controllers, services, directives) are following as closely as possible [johnpapa's style guide][styleguide] for Angular 1.

Although the framework used ([Angular Material]) supports responsiveness, this app is solely designed for mobile experiences. So I recommend viewing on a smartphone or simulating with browsers' mobile tools.


[styleguide]: https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md
[angular material]: https://material.angularjs.org/
