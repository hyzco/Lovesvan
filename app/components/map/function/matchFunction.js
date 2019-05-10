


export default matchFunction = (uid,targetUid,status)=>{

          switch(status){
            case "request":
                      this.requestMatch(uid,targetUid);
             
             }
    
}


     requestMatch = (uid,targetUid)=>{
                console.log(uid,targetUid);
                fetch('http://ffa1.lovesvan.com/api/setNewMatch', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    uid:  uid,
                    tuid: targetUid,
                  }),
                });
    }

