#include <iostream>
#include <vector>
using namespace std;
int findMajorityElement(vector <int>& nums){
    int candidate=0,count=0;
    for(int num:nums){
        if(count==0){
            candidate=num;
            count=1;
        }
        else{
            if (candidate==num){
                count++;
            }
            else{
                count--;
            }
        }
    }
    count=0;
    for(int num:nums){
        if (num==candidate){
            count++;
        }
    }
    if(count>nums.size()/2){
        return candidate;
    }
    else{
        return -1;
    }
}
int main(){
    vector<int> arr={2,2,2,2,2,2,3,6,6,5,4};
    cout<<findMajorityElement(arr);
}