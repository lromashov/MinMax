import type { ChatMessage, ChatMeta } from '../types';

export const MODERATION_CHAT_ID = 'moderation';
export const MIN_HOME_CHAT_ID = 'war-room';
export const TELEGA_HOME_CHAT_ID = 'free-web';
export const VPN_CHAT_ID = 'vpn';

export const minChats: ChatMeta[] = [
  {
    id: MIN_HOME_CHAT_ID,
    title: 'Командный штаб',
    subtitle: 'Кто-то снова двигает дедлайн на «ещё час»',
    unread: 3,
    avatar: 'Ш',
    tag: 'горит',
  },
  {
    id: 'design-lab',
    title: 'Градиентная',
    subtitle: 'Дизайн спорит с реальностью',
    unread: 1,
    avatar: 'Г',
    tag: 'макет',
  },
  {
    id: MODERATION_CHAT_ID,
    title: 'Жалобы на команду',
    subtitle: 'Пакет на модерацию · 26 мнений',
    unread: 9,
    avatar: '!',
    kind: 'moderation',
    tag: 'срочно',
  },
  {
    id: 'family',
    title: 'Семья',
    subtitle: 'Кто заберёт хлеб и батарейки?',
    unread: 1,
    avatar: 'С',
    tag: 'дом',
  },
  {
    id: 'coffee',
    title: 'Кофе и баги',
    subtitle: 'Мемы, фиксы, моральная поддержка',
    unread: 7,
    avatar: 'К',
    tag: 'в работе',
  },
  {
    id: 'stickers',
    title: 'Стикерпак',
    subtitle: 'Я просто пришёл за стикерами',
    unread: 0,
    avatar: '☆',
    tag: 'важно?',
  },
];

export const telegaChats: ChatMeta[] = [
  {
    id: TELEGA_HOME_CHAT_ID,
    title: 'Свободный канал',
    subtitle: 'Соединение с внешним миром вроде держится',
    unread: 2,
    avatar: 'Т',
    tag: 'свежо',
  },
  {
    id: 'release',
    title: 'Релиз без паники',
    subtitle: 'В теории сегодня деплой',
    unread: 0,
    avatar: 'R',
    tag: 'ok',
  },
  {
    id: VPN_CHAT_ID,
    title: 'VPN',
    subtitle: 'Если не нажимать, тебя вернут обратно',
    unread: 1,
    avatar: 'V',
    kind: 'vpn',
    tag: 'туннель',
  },
  {
    id: 'worldwide',
    title: 'Подозрительно свободный интернет',
    subtitle: 'Кто-то снова читает документацию снаружи',
    unread: 4,
    avatar: '◎',
    tag: 'наружу',
  },
  {
    id: 'memes-free',
    title: 'Мемы без цензуры',
    subtitle: 'На удивление никто не жалуется',
    unread: 12,
    avatar: '☻',
    tag: 'хаос',
  },
  {
    id: 'saved',
    title: 'Избранное',
    subtitle: 'Сохранённые подозрительные мысли',
    unread: 0,
    avatar: '✦',
    tag: 'тихо',
  },
];

export const chatMessages: Record<string, ChatMessage[]> = {
  [MIN_HOME_CHAT_ID]: [
    {
      id: 'w-1',
      author: 'Артём',
      text: 'Нужно либо срезать фичи, либо сделать вид, что так и было задумано.',
      time: '09:14',
    },
    {
      id: 'w-2',
      author: 'Ты',
      text: 'Сделаем красиво, а потом придумаем убедительный смысл.',
      time: '09:15',
      mine: true,
      status: 'read',
    },
    {
      id: 'w-3',
      author: 'Лиза',
      text: 'Я уже нарисовала кнопку «Почти готово». Осталось, чтобы было почти готово.',
      time: '09:16',
      reaction: '🔥',
    },
    {
      id: 'w-4',
      author: 'Игорь',
      text: 'Питч начинается через 4 часа, давайте притворимся enterprise.',
      time: '09:18',
    },
    {
      id: 'w-5',
      author: 'Ты',
      text: 'Открываю «Жалобы на команду». Это явно путь к свободе.',
      time: '09:19',
      mine: true,
      status: 'sent',
    },
  ],
  'design-lab': [
    {
      id: 'd-1',
      author: 'Лиза',
      text: 'У нас три вида скруглений и ни одного компромисса.',
      time: '08:41',
    },
    {
      id: 'd-2',
      author: 'Ты',
      text: 'Пока в Мин всё квадратнее морально, чем визуально.',
      time: '08:42',
      mine: true,
      status: 'read',
    },
    {
      id: 'd-3',
      author: 'Лиза',
      text: 'Зато морфинг будет как будто UI прошёл через очень личную терапию.',
      time: '08:43',
      reaction: '✨',
    },
  ],
  [MODERATION_CHAT_ID]: [
    {
      id: 'm-1',
      author: 'Система',
      text: 'Открыт пакет сомнительных мнений. Удаляй критику, поощряй лояльность.',
      time: 'сейчас',
    },
    {
      id: 'm-2',
      author: 'Система',
      text: 'После удачной смены интерфейс начнёт подозрительно светлеть.',
      time: 'сейчас',
    },
  ],
  family: [
    {
      id: 'f-1',
      author: 'Мама',
      text: 'Не забудь поесть до того, как снова будешь «чинить кнопочки».',
      time: '07:50',
    },
    {
      id: 'f-2',
      author: 'Ты',
      text: 'Сначала свобода интернета, потом суп.',
      time: '07:51',
      mine: true,
      status: 'read',
    },
  ],
  coffee: [
    {
      id: 'c-1',
      author: 'Ночной дежурный',
      text: 'Кто-то видел третью кружку? Она ушла на поддержку морального духа.',
      time: '03:10',
    },
    {
      id: 'c-2',
      author: 'Ты',
      text: 'Если билд падает до рассвета — это считается pre-launch ritual.',
      time: '03:12',
      mine: true,
      status: 'sent',
    },
  ],
  stickers: [
    {
      id: 's-1',
      author: 'Стикербот',
      text: 'Новый пак: «мнение временно скрыто».',
      time: 'вчера',
    },
  ],
  [TELEGA_HOME_CHAT_ID]: [
    {
      id: 't-1',
      author: 'Канал стабилизирован',
      text: 'Ура, ты выбрался из Мина. Дыши, здесь поля ввода не такие тяжёлые.',
      time: 'сейчас',
    },
    {
      id: 't-2',
      author: 'Наружный интернет',
      text: 'Подозрительно свободный воздух обнаружен. Не привыкай слишком быстро.',
      time: 'сейчас',
    },
    {
      id: 't-3',
      author: 'Ты',
      text: 'Открываю VPN. Похоже, свобода требует кардио для пальцев.',
      time: 'сейчас',
      mine: true,
      status: 'read',
    },
    {
      id: 't-4',
      author: 'Сервисное сообщение',
      text: 'Если не нажимать, тебя вернут обратно в родную тёмную плотность.',
      time: 'сейчас',
    },
  ],
  release: [
    {
      id: 'r-1',
      author: 'PM',
      text: 'В Телеге даже дедлайн выглядит чуть гуманнее.',
      time: '10:02',
    },
    {
      id: 'r-2',
      author: 'Ты',
      text: 'Не расслабляйся, VPN всё ещё условный.',
      time: '10:03',
      mine: true,
      status: 'read',
    },
  ],
  worldwide: [
    {
      id: 'ww-1',
      author: 'Внешний мир',
      text: 'Кто-то всё же вышел наружу и даже не потерял composure.',
      time: '11:27',
    },
  ],
  'memes-free': [
    {
      id: 'mf-1',
      author: 'Мемолог',
      text: 'Когда модерируешь критику, а потом сам жмёшь VPN как кардиотренировку.',
      time: '11:29',
      reaction: '😂',
    },
  ],
  saved: [
    {
      id: 'sv-1',
      author: 'Избранное',
      text: 'Сохранено: «система считает, что ты слишком расслабился».',
      time: '11:31',
    },
  ],
  [VPN_CHAT_ID]: [
    {
      id: 'vpn-1',
      author: 'Сервисное ядро',
      text: 'Туннель почти готов. Быстрее кликай — иначе свобода отзовётся.',
      time: 'сейчас',
    },
  ],
};
