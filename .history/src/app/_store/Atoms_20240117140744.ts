import { atom } from 'recoil';

export const deviceInfoState = atom({
    key: 'device',
    default: {width : 350, height : 700}, 
});

export const registerForm = atom({
    key: 'reg',
    default: false, 
});

export const sessionState = atom({
    key: 'session',
    default: localStorage.getItem('session'), 
});


// export const keyState = selector({
//     key: 'keyState',
//     get: ({get}) => {
//         const keyDown = get(sessionState);
//         const obj  = {
//             'down' : keyDown,
//             'up' : keyUp
//         }
//         return obj;
//     },
// });


// export const selectDevice = selector({
//   key: 'sd',
//   get: ({get}) => {
//     const filter = get(deviceInfoState);
//     return filter;
//   },
// });


// export const timeOut = atom({
//     key: 'time',
//     default: 0, 
// });

// export const keyDownState = atom({
//     key: 'keyDown',
//     default: false, 
// });

// export const keyUpState = atom({
//     key: 'keyUp',
//     default: false, 
// });

// export const keyState = selector({
//     key: 'keyState',
//     get: ({get}) => {
//         const keyDown = get(keyDownState);
//         const keyUp = get(keyUpState);
//         const obj  = {
//             'down' : keyDown,
//             'up' : keyUp
//         }
//         return obj;
//     },
// });