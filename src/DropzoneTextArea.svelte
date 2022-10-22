<script>
  import Drop from "./Drop.svelte";

  // array of: { filename, size, text }, only one file drop is allowed for this component
  let files = [];

  let input = ""; // textarea value

  // component props
  export let handleFile = () => {}; // callback function to handle file drop
  export let handleRead = () => {}; // callback for reading file, no modification
  export let valueModify = (v) => v; // callback for modifying textarea value
  export let handleUpdate = () => {}; // callback for updating textarea value

  // internal handlers

  const handleFileInternal = ({ detail: file }) => {
    handleFile(file);
  };

  const handleReadInternal = ({ detail: { data, file } }) => {
    files.push({
      name: file.name,
      size: file.size,
      data,
    });

    files = files; // update state

    // update textarea text content
    input = valueModify(data);

    handleRead(data);
  };

  // update of textarea content, either by drag and drop or by typing
  $: {
    handleUpdate(input);
  }
</script>

<Drop
  readAsText
  on:drop={() => {
    // clear files on each drop event
    files = [];
    files = files;
  }}
  on:file={handleFileInternal}
  on:read={handleReadInternal}
>
  <textarea
    cols="80"
    rows="25"
    bind:value={input}
    placeholder="Drag and drop input file here"
    {...$$props}
  />
</Drop>
