import "./bbb.scss"

module.exports = function say(elem) {
    console.log('今天天气真好');
    document.body.addEventListener('click',
        e => {

            import(/* webpackChunkName: "我是bbbbb模块啊" */'./ccc').then(mod => {

                document.write('asdaddas')

            });

        });
}
