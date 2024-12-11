export async function usePatchData(url, data){
      try {
        const res = await fetch(url, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        if(!res.ok) {
          return {success: false}
        }
        return {success: true}
      } catch (error) {
        return {success: false}
      }
   
  }
    