//nodenodenodenodenode
var publication=require('./publication.json');
publication.forEach(element => {
    var link=element.DOIorURL.trim();
    if(element.Department[0]=='CSE'){
        console.log(element.publicationId,'->',element.publisherId[0],'->',link)
    }
    // else if(link.includes('DOI:')){
    //     var x= new String();
        
    //     link=link.slice(link.indexOf('DOI')+4).trim();
    //     if(link.substring(0,4)!="http"){
    //         if(link.substring(0,3)!="dx." && link.substring(0,3)!="doi"){
    //           if(link[0]!='/'){
    //             link="/"+link;
    //           }
    //           link="doi.org"+link;
    //         }
    //         link='https://'+link;
    //       }
    //     console.log(element.publicationId,'->',element.publisherId[0],'->',link)
    // }
    // else{

    //     if(link.substring(0,4)!="http"){
    //         if(link.substring(0,3)!="dx." && link.substring(0,3)!="doi"){
    //             if(link[0]!='/'){
    //                 link="/"+link;
    //             }
    //             link="doi.org"+link;
    //         }
    //         link='https://'+link;
    //     }
    //     console.log(element.publicationId,'->',element.publisherId[0],'->',link)
    // }

});
