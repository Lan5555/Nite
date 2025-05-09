#Nite
The official Nite Package
See
http://nite-documentation.vercel.app
For documentation.

Utilize the power of the Watch function
const [count,setCount,observe] = Watch(0);

//Initial Display
const button = createNode('button);
Text(button,`Count ${count()}`);

observe(() => {
    Text(button,`Count ${count()}`);
});

listenForEvent(button,'click',() => setCount(count() + 1));

//Any change made to count would be effected and rendered.

