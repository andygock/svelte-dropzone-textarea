<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let readAsBuffer = false;
  export let readAsText = false;
  export let readAsArray = false;
  export let multi = false; // enable multiple file drops
  export const colorHover = "palegreen";

  let hover = false;

  const sendBuffer = async (file) => {
    const fileBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(fileBuffer);
    dispatch("read", { data: buffer, file });
  };

  const sendText = async (file) => {
    const text = await file.text();
    dispatch("read", { data: text, file });
  };

  const sendArray = async (file) => {
    const text = await file.text();
    const lines = text.split(/\r?\n/);
    dispatch("read", { data: lines, file });
  };

  const handleDrop = (ev) => {
    // console.log("handledrop()", ev);
    dispatch("drop", ev);
    ev.preventDefault();

    // don't think dragleave occurs after a drop event
    hover = false;

    if (ev.dataTransfer.items) {
      if (!multi && ev.dataTransfer.items.length > 1) {
        alert("Error: Multiple file drops not supported.");
        return;
      }
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        if (ev.dataTransfer.items[i].kind === "file") {
          // https://developer.mozilla.org/en-US/docs/Web/API/File
          let file = ev.dataTransfer.items[i].getAsFile();

          dispatch("file", file);

          if (readAsBuffer) sendBuffer(file);
          if (readAsText) sendText(file);
          if (readAsArray) sendArray(file);
        }
      }
    }
  };

  const handleDragover = (e) => {
    e.preventDefault();
    if (!hover) hover = true;
  };

  const handleDragleave = (e) => {
    e.preventDefault();
    hover = false;
  };
</script>

<span
  style="--color-hover: {colorHover};"
  class={hover ? "drop-hover" : "drop"}
  on:drop={handleDrop}
  on:dragover={handleDragover}
  on:dragleave={handleDragleave}
>
  <slot />
</span>

<style>
  .drop,
  .drop :global(*) {
    background-color: inherit;
  }
  .drop-hover,
  .drop-hover :global(*) {
    background-color: var(--color-hover);
  }
</style>
