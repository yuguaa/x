## zh-CN

流式传输。可以传递 `streaming` 来通知 Bubble 当前的 `content` 是否属于流式输入的。当处于流式传输模式，无论是否启用 Bubble 输入动画，在 `streaming` 变为 `false` 之前，Bubble 不会因为把当前 `content` 全部输出完毕就触发 `onTypingComplete` 回调，只有当 `streaming` 变为 `false`，且 `content` 全部输出完毕后，Bubble 才会触发 `onTypingComplete` 回调。这样可以避免由于流式传输不稳定而导致多次触发 `onTypingComplete` 回调的问题，保证一次流式传输过程仅触发一次 `onTypingComplete`。

在这个例子中，你可以尝试强制关闭流式标志，同时

- 若你启用了输入动画，进行 **慢速加载** 时，会因为流式传输的速度跟不上动画速度而导致多次触发 `onTypingComplete`。
- 若你关闭了输入动画，每一次的流式输入都会触发 `onTypingComplete`。

## en-US

Stream. 'streaming' can be passed to tell Bubble if the current 'content' is a streaming input. When in streaming mode, with or without Bubble input animation, the Bubble will not trigger the 'onTypingComplete' callback until 'streaming' becomes 'false', and the Bubble will only trigger ' when 'streaming' becomes 'false' and the 'content' is fully output. onTypingComplete' callback. This avoids the issue of multiple triggers of onTypingComplete' callbacks due to unstable streaming, ensuring that only 'onTypingComplete' is triggered once during a streaming process.

In this example, you can try to force the streaming flag to be turned off while

- If you enable input animations, 'onTypingComplete' will be triggered multiple times when performing a **load slowly** because the streaming speed cannot keep up with the animation speed.
- If you turn off the input animation, 'onTypingComplete' will be triggered every time you stream the input.
