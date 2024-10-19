import { toast } from "@/hooks/use-toast";

export function useFetchData(url){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useViewTransitionState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
      const fetData = async () => {
        try {
          const res = await fetch(url, {
            method: "GET",
          })
          if(!res.ok) {
           return toast({
              variant: "destructive",
              title: "Can't get any data!",
            })
          }
          const data = await res.json()
          setData(data)
          setLoading(false)
        } catch (error) {
          setError(error)
          setLoading(false)
          toast({
            variant: "destructive",
            title: "Something wrong with add new collection!",
          })
        }
      }
      fetData()
    }, [url])
  
    return {
      loading,
      error,
      data,
    }
  }
  