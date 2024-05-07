const labels = [
    '2018-19',
    '2019-20',
    '2020-21',
    '2021-22',
    '2022-23'
    
];
const xhr = new XMLHttpRequest();
xhr.open("get", "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records?limit=20&refine=etablissement_actuel_lib%3A%22Universit%C3%A9%20Toulouse%20-%20Jean%20Jaur%C3%A8s%22&refine=niveau_lib%3A%223%C3%A8me%20ann%C3%A9e%22&refine=diplom%3A%222300031%22");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const reponse = JSON.parse(xhr.responseText);
        const donnees = reponse.results;
        const totals=[]
       const masculin=[]
       const femminin =[]
    for (const i of donnees ){
        const j=labels.indexOf(i.annee_universitaire)
        
            totals[j]=i.effectif_total
            masculin[j]=i.hommes
            femminin[j]=i.femmes

    
    }


    const data = {
        labels: labels,
        datasets: [{
            label: 'étudiants inscrits en MIASHS à l\'UT2J en l3',
            backgroundColor: 'rgb(0, 199, 193)',
            borderColor: 'rgb(0, 199, 193)',
            data: totals,
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {}
    };

    
    const myChart = new Chart(
        document.querySelector('#moncanvas'),
        config
    );

    const dataSexe= {     
        labels: labels, 
        datasets:
         [{       
            label: 'étudiantes feminins inscrites en MIASHS à l\'UT2J',     
            backgroundColor: 'rgb(0, 199, 193)',       
            borderColor: 'rgb(0, 199, 193)',      
            data: femminin ,
    
         },
         {    
            label: 'étudiants masculins inscrits en MIASHS à l\'UT2J',
            backgroundColor: 'rgb(255, 0, 0)',       
            borderColor: 'rgb(255, 0, 0)',         
            data: masculin,
                
         }
        ]     
        };
         
         const configSexe= {   
              type: 'line',     
              data: dataSexe,     
              options: {}  
             };
             
    
    const myChartSexe = new Chart(    
        document.querySelector('#canvas2'),     
        configSexe   );

const dataRatio = [];
for (let compteur = 0; compteur < labels.length; compteur++) {
    const ratio = femminin[compteur] / masculin[compteur];
    dataRatio[compteur] = ratio;
}

    const dataR= {     
            labels: labels, 
            datasets:
             [{       
                label: 'étudiants femmes/hommes inscrits en science de la vie',     
                backgroundColor: 'rgb(0, 199, 193)',       
                borderColor: 'rgb(0, 199, 193)',      
                data: dataRatio ,
        
             },
             
            ]     
            };
             
             const config3 = {   
                  type: 'line',     
                  data: dataR,     
                  options: {}  
                 };
                 
        
        const myChart3 = new Chart(    
            document.querySelector('#canvas3'),     
            config3   );
    
    }

    
};
xhr.send();

