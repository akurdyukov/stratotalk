export const schema = {
  title: 'Scenario editor',
  type: 'object',
  required: ['id', 'name', 'text'],
  properties: {
    id: { type: 'string', title: 'Идентификатор', default: 'Уникальный идентификатор.' },
    name: { type: 'string', title: 'Название', default: 'Новое название сценария.' },
    description: { type: 'string', title: 'Краткое описание', default: '' },
    text: { type: 'string', title: 'Описание кейса', default: '' },
    substitutions: {
      type: 'array',
      title: 'Общие подстановки',
      items: {
        $ref: '#/definitions/Substitution',
      },
    },
    roles: {
      type: 'array',
      title: 'Роли',
      items: {
        type: 'object',
        required: ['name', 'description', 'variants'],
        properties: {
          name: { type: 'string', title: 'Название роли' },
          description: { type: 'string', title: 'Описание роли' },
          variants: {
            type: 'array',
            title: 'Варианты',
            items: {
              $ref: '#/definitions/Variant',
            },
          },
        },
      },
    },
  },
  definitions: {
    Variant: {
      type: 'object',
      title: 'Вариант',
      required: ['name', 'description', 'substitutions'],
      properties: {
        name: { type: 'string', title: 'Название варианта' },
        description: { type: 'string', title: 'Тайный текст для варианта' },
        substitutions: {
          type: 'array',
          title: 'Подстановки',
          items: {
            $ref: '#/definitions/Substitution',
          },
        },

      },
    },
    Substitution: {
      type: 'object',
      required: ['id', 'text'],
      properties: {
        id: { type: 'string', title: 'ID Постановки', default: 'Уникальный идентификатор.' },
        text: {
          type: 'array',
          title: 'Тексты',
          items: {
            type: 'string',
          },
        },
      },
    },
  },
};

