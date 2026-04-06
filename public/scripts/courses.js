/**
 * LabTechAI - Dados dos Cursos
 * Módulos, Fases, Aulas e Exercícios.
 */

window.COURSE_DATA = {
  'logica-programacao': {
    id: 'logica-programacao',
    title: 'Lógica de Programação',
    description: 'Domine a base de toda linguagem de programação.',
    thumbnail: 'logic-glow.svg',
    totalXp: 2000,
    modules: [
      {
        id: 'module-1',
        title: 'Módulo 1: Variáveis e Tipos',
        lessons: [
          {
            id: 'lp-1-1',
            title: 'O que são Variáveis?',
            type: 'lesson',
            xp: 50,
            content: {
              slides: [
                {
                  title: 'Imagine uma Gaveta...',
                  text: 'Variáveis são como gavetas etiquetadas onde guardamos informações para usar depois.',
                  illustration: 'drawer-variable.svg'
                },
                {
                  title: 'Tipos de Dados',
                  text: 'Podemos guardar Números (int/float), Textos (String) ou Lógica (Boolean).',
                  illustration: 'data-types.svg'
                }
              ],
              example: `let nome = "Explorador";\nlet nivel = 1;`
            }
          },
          {
            id: 'lp-1-2',
            title: 'Desafio das Gavetas',
            type: 'exercise',
            xp: 100,
            exercise: {
              prompt: 'Crie uma variável chamada "xp" e atribua o valor 100 a ela.',
              editorInitial: '// Digite seu código aqui\n',
              validation: (code) => {
                const clean = code.replace(/\s/g, '');
                return clean.includes('letxp=100') || clean.includes('constxp=100') || clean.includes('varxp=100');
              },
              hint: 'Use a palavra-chave let ou const.'
            }
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Módulo 2: Condições',
        lessons: [
          {
            id: 'lp-2-1',
            title: 'Tomando Decisões (if/else)',
            type: 'lesson',
            xp: 60,
            content: {
              slides: [
                {
                  title: 'Se... Então...',
                  text: 'Programar é criar regras. SE (if) hoje for sol, VOU à praia. SENÃO (else), FICO em casa.',
                  illustration: 'logic-branch.svg'
                }
              ],
              example: `if (xp >= 100) {\n  console.log("Level Up!");\n}`
            }
          },
          {
            id: 'lp-2-2',
            title: 'Prática de Decisão',
            type: 'exercise',
            xp: 120,
            exercise: {
              prompt: 'Crie uma condição que verifica se a variável "idade" é maior ou igual a 18.',
              editorInitial: 'let idade = 20;\n\n// Escreva o IF aqui\n',
              validation: (code) => code.includes('if') && code.includes('idade >= 18'),
              hint: 'Use a estrutura: if (condicao) { ... }'
            }
          }
        ]
      },
      {
        id: 'module-3',
        title: 'Módulo 3: Loops',
        lessons: [
          {
            id: 'lp-3-1',
            title: 'A Repetição Infinita (Quase!)',
            type: 'lesson',
            xp: 70,
            content: {
              slides: [
                {
                  title: 'Para cada item...',
                  text: 'Loops como o FOR permitem repetir uma ação várias vezes sem escrever o mesmo código.',
                  illustration: 'loop-circle.svg'
                }
              ],
              example: `for (let i = 0; i < 5; i++) {\n  console.log("Olá!");\n}`
            }
          }
        ]
      },
      {
        id: 'module-4',
        title: 'Módulo 4: Funções',
        lessons: [
          {
            id: 'lp-4-1',
            title: 'Fábrica de Código',
            type: 'lesson',
            xp: 100,
            content: {
              slides: [
                {
                  title: 'Encapsulando Lógica',
                  text: 'Funções são blocos de código que você "chama" pelo nome sempre que precisar.',
                  illustration: 'function-box.svg'
                }
              ]
            }
          }
        ]
      }
    ]
  }
};
