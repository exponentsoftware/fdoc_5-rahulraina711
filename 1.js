const request = require("superagent");

const API_URL = 'https://restcountries.eu/rest/v2/all';


request.get(API_URL)
    .then(response => {
        let langObj = {};

        response.body.map(country => {
            country.languages.map(language => {
                if (!langObj[language.name]) {
                    langObj[language.name] = 1;
                } else {
                    langObj[language.name] += 1;
                }

            })
            
        })
        //console.log(langObj);

        let result = [];

        let langArr = Object.keys(langObj);
        for(let i=0 ; i<langArr.length; i++){
            result.push({
                language: langArr[i],
                countries:langObj[langArr[i]]
            })
        };
        

        let resultant = result.sort((a,b)=> b.countries - a.countries).slice(0,15);
        console.log(resultant);

        // 10 most largest area
        let areaArr = [];
        response.body.map(country=>{
            areaArr.push({
                country: country.name,
                area: Math.floor(country.area)
            });

            let resultantArea = areaArr.sort((a,b)=> b.area-a.area).slice(0,10);
            console.log(resultantArea);
        })



    }).catch(err => err)