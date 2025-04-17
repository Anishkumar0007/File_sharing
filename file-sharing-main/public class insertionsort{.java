public class insertionsort{
    public static int insertionsort(int[] arr) {
        int n=arr.length;
        for(int i =1;i<n;i++){
            int key=arr[i];
            int j=i-1;
            while(j>=0 && j>key){
                arr[j+1]=arr[j];
                j=j-1;
            }
            arr[j+1]=key;
        }
        
    }
    public static void printArray(int[] arr){
        for(int nums:arr){
            System.out.print(nums+" ");
        }
        System.out.println();
    }
    public static void main(String []args){
        int[] arr={23,1,7,2,10};
        System.out.println("original array:");
        printArray(arr);
        insertionsort(arr);
        System.out.println("sorted array:");
        printArray(arr);    
    }
}