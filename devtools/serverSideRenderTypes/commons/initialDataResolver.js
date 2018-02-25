export default function initialDataResolver(initialDataFromUser) {     
    const PromisesFromInitialData = []
    for(let item in initialDataFromUser) {
        PromisesFromInitialData.push(initialDataFromUser[item])
    }
        
    return Promise.all(PromisesFromInitialData)
           .then((promissesReturn) => {
               const initialDataFromServer = {}
               let i = -1;
               for( let item in initialDataFromUser ) {
                  i++
                  initialDataFromServer[item] = promissesReturn[i]
               }
               return initialDataFromServer
            });    
}