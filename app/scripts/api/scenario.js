// @flow

type Substitute = {
  id: string,
  text: string,
}

type Variant = {
  name: string,
  description: string,
  substitutions: Array<Substitute>,
}

type Role = {
  name: string,
  description: string,
  variants: Array<Variant>,
}

type Scenario = {
  id: string,
  name: string,
  text: string,
  substitutions: Array<Substitute>,
  roles: Array<Role>,
}

const exampleScenario: Scenario = {
  id: 'scenario1',
  name: 'Иностранная команда',
  text: 'Тут будет текст и вот постановка {{subst1}}. А еще есть постановка, зависящая от варианта роли: {{subst2}}.',
  substitutions: [
    {
      id: 'subst1',
      text: 'Подставленный текст',
    },
  ],
  roles: [
    {
      name: 'Менеджер',
      description: 'Еще надо придумать нужен ли этот текст',
      variants: [
        {
          name: 'Опытный менеджер',
          description: 'Вы опытный менеджер, уже 10 лет на посту',
          substitutions: [
            {
              id: 'subst2',
              text: 'Опытный менеджер',
            },
          ],
        },
        {
          name: 'Молодой менеджер',
          description: 'Вы молодой менеджер, это ваш первый проект',
          substitutions: [
            {
              id: 'subst2',
              text: 'Молодой менеджер',
            },
          ],
        },
      ],
    },
    {
      name: 'Технический лидер',
      description: 'Еще надо придумать нужен ли этот текст',
      variants: [
        {
          name: 'Чувак-в-свитере',
          description: 'Опытный, бородатый и нелюдимый',
          substitutions: [
            {
              id: 'subst2',
              text: 'Опытный менеджер',
            },
          ],
        },
        {
          name: 'Хипстер на гироскутере',
          description: 'Все круто, чо?!',
          substitutions: [
            {
              id: 'subst2',
              text: 'Молодой менеджер',
            },
          ],
        },
      ],
    },
  ],

};

export function getScenarios(): Promise<Array<Scenario>> {
  return new Promise((resolve: (any) => void) => {
    setTimeout(() => {
      resolve([exampleScenario]);
    }, 1000);
  });
}

export function getScenarioById(id: string): Promise<Scenario> {
  return new Promise((resolve: (any) => void, reject: (any) => void) => {
    setTimeout(() => {
      if (id === exampleScenario.id) {
        resolve(exampleScenario);
      } else {
        reject(`Unknown scenario ${id}`);
      }
    });
  });
}
