const projectLanguages = {
    go: {
        id: 'go',
        name: 'Go',
        colour: '79d4fd',
        short: 'GO',
        textColour: '111'
    },
    python: {
        id: 'python',
        name: 'Python',
        colour: '3c78a9',
        short: 'PYTHON',
        textColour: 'fff'
    },
    javascript: {
        id: 'javascript',
        name: 'JavaScript',
        colour: 'f0db4f',
        short: 'JS',
        textColour: '111'
    },
    php: {
        id: 'php',
        name: 'PHP',
        colour: '777bb3',
        short: 'PHP',
        textColour: 'fff'
    }
}

const projectTypes = {
    application: {
        id: 'application',
        name: 'Application',
        plural: 'Applications'
    },
    library: {
        id: 'library',
        name: 'Library',
        plural: 'Libraries'
    }
}

const articleCategories = {
    'efficient-computing': {
        id: 'efficient-computing',
        name: 'Efficient Computing',
        description: 'In modern times computing resources are often taken for granted. Articles in this category explore ways to optimise common computing things to be more efficient.'
    },
    'opinion': {
        id: 'opinion',
        name: 'Opinion',
        description: 'Just sharing my opinion on things.'
    }
}

export {
    projectLanguages,
    projectTypes,
    articleCategories
}