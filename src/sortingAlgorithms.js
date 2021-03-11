// HELPER FUNCTIONS
function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations,) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;

    while (i <= middleIdx && j <= endIdx) {
        // Values that are being compared; Add to animations to change their color.
        animations.push([i, j]);
        // Values that are being compared; Add to animations to revert their color.
        animations.push([i, j]);

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // Overwrite value at index k in the original array with the value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // Overwrite the value at index k in the original array with the value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // Values that are being compared; Add to animations to change their color.
        animations.push([i, i]);
        // Values that are being compared; Add to animations to revert their color.
        animations.push([i, i]);
        // Overwrite the value at index k in the original array with the value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // Values that are being compared; Add to animations to change their color.
        animations.push([j, j]);
        // Values that are being compared; Add to animations to revert their color.
        animations.push([j, j]);
        // Overwrite the value at index k in the original array with the value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

function heapify(arr, n, i, animations) {
    // Find highest value between root, left, and right in tree
    let highest = i;            //index
    const left = 2 * i + 1;     //index
    const right = 2 * i + 2;    //index

    animations.push([i, left]);
    if (left < n && arr[left] > arr[highest]){
        highest = left;
    }
    animations.push([i, left]);

    animations.push([i, right]);
    if (right < n && arr[right] > arr[highest]){
        highest = right;
    }
    animations.push([i, right]);

    if (highest !== i){
        arr = swap(arr, arr[i], arr[highest], animations);
        heapify(arr, n, highest, animations);
    }

    console.log(arr);
}

// EXPORTED FUNCTIONS
function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function getBubbleSortAnimations(array) {
    const animations = [];
    let len = array.length;

    if (len <= 1) return array;

    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - 1; j++) {
            animations.push([j, j + 1]);
            animations.push([j, j + 1]);

            if (array[j] > array[j + 1]) {
                let val1 = array[j];
                let val2 = array[j + 1];

                animations.push([j, val2]);
                animations.push([j + 1, val1]);

                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
            else {
                animations.push([j, array[j]]);
                animations.push([j + 1, array[j + 1]]);
            }
        }
    }
    return animations;
}

function getHeapSortAnimations(arr) {
    let animations = [];

    // arr.length / 2 - 1 is the last index that will be the parent of a tree
    for(let i = arr.length / 2 - 1; i >= 0; i--){
        heapify(arr, arr.length, i, animations);
    }

    return animations;
}

function swap(arr, i, i2, animations){
    let tmp = arr[i]
    arr[i] = arr[i2];
    arr[i2] = tmp;

    return arr;
}

export default { getBubbleSortAnimations, getMergeSortAnimations, getHeapSortAnimations }

// let bubbleSort = (inputArr) => {
//     let len = inputArr.length;
//     for (let i = 0; i < len; i++) {
//         for (let j = 0; j < len; j++) {
//             if (inputArr[j] > inputArr[j + 1]) {
//                 let tmp = inputArr[j];
//                 inputArr[j] = inputArr[j + 1];
//                 inputArr[j + 1] = tmp;
//             }
//         }
//     }
//     return inputArr;
// };