# svelte-dropzone-textarea

Drag and drop a file into a `<textarea>` Svelte component and load the file's content into the textarea.

## Install

    npm install svelte-dropzone-textarea

## Usage

Example usage:

```svelte
<script>
  import DropzoneTextarea from "svelte-dropzone-textarea";

  let data = "";

  const handleRead = (text) => {
    data = text;
    console.log(`handleRead(): ${text.length} bytes`);
  };

  const handleUpdate = (text) => {
    date = text;
    console.log(`handleUpdate(): ${text.length} bytes`);
  };
</script>

<h1>DropzoneTextarea</h1>
<DropzoneTextarea {handleRead} {handleUpdate} />
<p>data is {data.length} characters long</p>
```

Demo on [StackBlitz](https://stackblitz.com/edit/svelte-dropzone-textarea?file=src%2FApp.svelte)

## Props

| Name           | Type       | Description                                                                                 |
| -------------- | ---------- | ------------------------------------------------------------------------------------------- |
| `handleFile`   | `function` | Callback function that is called when a file is dropped.                                    |
| `handleRead`   | `function` | Callback function that is called when a file is dropped and read.                           |
| `handleUpdate` | `function` | Callback function that is called when the textarea is updated, includes dropping or typing. |
| `valueModify`  | `function` | Modify value of dropped file contents before updating textarea.                             |
| `...rest`      | `...`      | Any other props are passed to the underlying textarea.                                      |
