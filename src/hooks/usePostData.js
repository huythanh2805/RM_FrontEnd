import { toast } from "./use-toast";

export async function usePostData(url, postData){
    let error;
    let message;
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
          })
          const data = await res.json()
          if(!res.ok) {
           return toast({
              variant: "destructive",
              title: data.message,
            })
          }
          message = data.message
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Something went wrong with usePostDate!",
          })
        }
        return {message}
}