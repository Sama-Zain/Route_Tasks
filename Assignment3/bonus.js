/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let number=nums[0];
    let count=0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === number) {
            count++;
        } else {
            count--;
            if (count === 0) {  
                number = nums[i];
                count = 1;
            }
        }
    }
    return number;
}
