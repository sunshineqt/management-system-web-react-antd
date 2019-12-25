// 使用Generator顺序执行两次异步操作
function* r(num) {
    const r1 = yield compute(num);
    yield compute(r1)
}

// compute为异步操作，结合promise使用可轻松实现异步操作队列
function compute(num) {
    return new Promise(resolve => {
        setTimeout(() => {
            const ret = num * num;
            console.log(ret, 'dk');
            resolve(ret);
        }, 1000)
    })
}

// 不使用递归函数调用
let it = r(2);
it.next().value.then(num => it.next(num));

// 修改为可处理Promise的next
function next(data) {
    let { value, done } = it.next(data);
    if (!done) {
        value.then(num => {
            next(num);
        });
    }
}

next();