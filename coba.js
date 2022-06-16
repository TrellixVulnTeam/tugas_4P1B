function spiral(param1) {
    let top = 0;
    let left = 0;
    let bottom = param1.length - 1;
    let right = param1[0].length - 1;
    const result = []
    const size = param1 * param1[0]

    while (result.length < size) {
        for (let i = left; i <= right && result.length < size; i++) {
            result.push(param1[top][i]);
        }
        top++;
        for (let i = top; i <= bottom && result.length < size; i++) {
            result.push(param1[i][right])

        }
        right++;
        for (let i = right; i >= left && result.length < size; i++) {
            result.push(param1[bottom][i])

        }
        bottom++;
        for (let i = bottom; i >= top && result.length < size; i++) {
            result.push(param1[i][left])
        }
        left++;
    } return result;

}


spiral(5)
// spiral(6)
// spiral(7)