// import "./aaa"
// import "./ccc"
import "./index.scss"

// require('./bbb')();
// require.ensure([], function (require) {
//     const dom = require('./aaa.js');
//     dom('#root').innerHTML = 'hello world';
// },'我是aaaaaaaa模块啊啊啊啊');

document.body.addEventListener('click',
    e => {

        import( /* webpackChunkName: "我是aaaa模块啊" */ './bbb').then(mod => {

            document.write('asdaddas')

        });

    });