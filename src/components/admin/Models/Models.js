export default {
    "Marcas":{
        "Headers":[
            {
                "text": "Id",
                "value": "id"
            },
            {
                "text": "Nome",
                "value": "name"
            },
            {
                "text": "Qtd. Associados",
                "value": "qtdpr"
            },
            {
                "text": "Ações",
                "value": "actions",
                "sortable": false
            }
        ],
        "InputFields":[
            {
                "type":"text",
                "name":"name",
                "label":"Nome",
                "rules":[
                    value => !!value || 'Obrigatório'
                ]
            }
        ],
        "MainProp": "name"
    },
    "Categorias":{
        "Headers":[
            {
                "text": "Id",
                "value": "id"
            },
            {
                "text": "Nome",
                "value": "name"
            },
            {
                "text": "Qtd. Associados",
                "value": "qtdpr"
            },
            {
                "text": "Ações",
                "value": "actions",
                "sortable": false
            }
        ],
        "InputFields":[
            {
                "type":"text",
                "name":"name",
                "label":"Nome",
                "rules":[
                    value => !!value || 'Obrigatório'
                ]
            }
        ],
        "MainProp": "name"
    },
    "Moedas":{
        "Headers":[
            {
                "text": "Id",
                "value": "id"
            },
            {
                "text": "Sigla",
                "value": "sigla"
            },
            {
                "text": "Pais de circulação",
                "value": "pais"
            },
            {
                "text": "Ações",
                "value": "actions",
                "sortable": false
            }
        ],
        "InputFields":[
            {
                "type":"text",
                "name":"sigla",
                "label":"Sigla",
                "rules":[
                    value => !!value || 'Obrigatório',
                    value => value.length<11 || 'Inválido! Máx. = 10'
                ]
            },
            {
                "type":"text",
                "name":"pais",
                "label":"País",
                "rules":[
                    value => !!value || 'Obrigatório'
                ]
            }
        ],
        "MainProp": "sigla"
    }
    
    
}