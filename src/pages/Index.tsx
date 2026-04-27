import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";

const SLANG_DATA = [
  {
    word: "Агриться",
    letter: "А",
    tag: "Эмоции",
    tagColor: "orange",
    rating: 4,
    definition: "Злиться, агрессивно реагировать. Пришло из киберспорта.",
    example: "Руководитель агрится, когда я опять пропускаю дедлайн.",
    origin: "От англ. aggro/aggression — агрессия.",
    synonyms: "Злиться, нервничать, заводиться",
  },
  {
    word: "Апать",
    letter: "А",
    tag: "Геймерский",
    tagColor: "cyan",
    rating: 3,
    definition: "Поднимать уровень чего-либо (например, в игре), улучшать.",
    example: "Нужно апнуть персонажа до максимального уровня.",
    origin: "От англ. up — поднимать.",
    synonyms: "Улучшать, прокачивать, повышать",
  },
  {
    word: "Альтушка",
    letter: "А",
    tag: "Субкультура",
    tagColor: "pink",
    rating: 3,
    definition: "Alt-girl — девушка альтернативной субкультуры: яркий макияж, розово-чёрная одежда, пирсинг.",
    example: "Она типичная альтушка — всегда в чёрном и с фиолетовыми волосами.",
    origin: "От англ. alt — alternative (альтернативный).",
    synonyms: "Готесса, эмо, альтернативщица",
  },
  {
    word: "Анк",
    letter: "А",
    tag: "Личность",
    tagColor: "cyan",
    rating: 3,
    definition: "Стильный мужчина за 30, в теме трендов, выглядит молодо. Комплимент, в отличие от «скуфа».",
    example: "Киллиан Мёрфи — чистый анк, видела его в новом фильме?",
    origin: "Из TikTok-культуры, противопоставление «скуфу».",
    synonyms: "Стильный, молодящийся, ухоженный мужчина",
  },
  {
    word: "Байтить",
    letter: "Б",
    tag: "Поведение",
    tagColor: "yellow",
    rating: 3,
    definition: "Провоцировать кого-то; иногда — копировать чужой стиль без разрешения.",
    example: "Не обращай внимания, он тебя байтит. / Он сбайтил мою презу.",
    origin: "От англ. bait — приманка, провокация.",
    synonyms: "Провоцировать, дразнить, копировать",
  },
  {
    word: "База",
    letter: "Б",
    tag: "Оценка",
    tagColor: "cyan",
    rating: 5,
    definition: "Правильная мысль, истина, что-то верное и бесспорное.",
    example: "Слышал, что он сказал? Выдал чистую базу!",
    origin: "От англ. based — основанный на реальности, верный.",
    synonyms: "Правда, истина, в точку",
  },
  {
    word: "Бести",
    letter: "Б",
    tag: "Общение",
    tagColor: "pink",
    rating: 2,
    definition: "Лучшая подруга или лучший друг.",
    example: "Сегодня с моей бести идём пить вино.",
    origin: "От англ. best — лучший.",
    synonyms: "Лучший друг, ЛП, подруга",
  },
  {
    word: "Бомбить",
    letter: "Б",
    tag: "Эмоции",
    tagColor: "orange",
    rating: 4,
    definition: "Сильно злиться или расстраиваться из-за чего-либо.",
    example: "У меня просто бомбит от того, как он себя ведёт.",
    origin: "Образное — как взрыв эмоций внутри.",
    synonyms: "Бесить, злить, раздражать",
  },
  {
    word: "Брейнрот",
    letter: "Б",
    tag: "Интернет",
    tagColor: "yellow",
    rating: 2,
    definition: "Контент, «высасывающий мозг» — абсурдные мемы и видео, понятные только узкому кругу.",
    example: "Мой любимый брейнрот — часовые видео про ИИ-бабушек на бегемотах.",
    origin: "От англ. brain rot — гниение мозга.",
    synonyms: "Тупой контент, абсурд, безумие",
  },
  {
    word: "Бро",
    letter: "Б",
    tag: "Общение",
    tagColor: "cyan",
    rating: 5,
    definition: "Друг, товарищ.",
    example: "Бро, ты не поверишь, что случилось сегодня!",
    origin: "От англ. brother — брат.",
    synonyms: "Друг, товарищ, приятель",
  },
  {
    word: "Вайб",
    letter: "В",
    tag: "Атмосфера",
    tagColor: "pink",
    rating: 5,
    definition: "Атмосфера, настроение, ощущение от места, человека или события. Слово 2024 года по версии «Грамота.ру».",
    example: "Твой плейлист — это плюс вайб для осеннего вечера.",
    origin: "От англ. vibe — вибрация, атмосфера.",
    synonyms: "Атмосфера, настроение, дух места",
    isWordOfDay: true,
  },
  {
    word: "Го",
    letter: "Г",
    tag: "Общение",
    tagColor: "cyan",
    rating: 5,
    definition: "Пойдём, давай — призыв к действию.",
    example: "Го гулять после школы?",
    origin: "От англ. go — идти, давай.",
    synonyms: "Пойдём, давай, поехали",
  },
  {
    word: "Гигачад",
    letter: "Г",
    tag: "Личность",
    tagColor: "orange",
    rating: 3,
    definition: "Собирательный образ идеального мужчины в пиковой физической форме.",
    example: "Я стесняюсь ходить в зал, там одни гигачады.",
    origin: "Из интернет-мемов про идеального мужчину.",
    synonyms: "Красавец, атлет, идеальный мужчина",
  },
  {
    word: "Гостинг",
    letter: "Г",
    tag: "Отношения",
    tagColor: "yellow",
    rating: 3,
    definition: "Внезапное прекращение общения без объяснения причин — человек просто исчезает.",
    example: "Он гостит меня. Не выходит на связь уже месяц.",
    origin: "От англ. ghost — призрак, исчезать.",
    synonyms: "Пропасть, исчезнуть, игнорировать",
  },
  {
    word: "Гринфлаг",
    letter: "Г",
    tag: "Отношения",
    tagColor: "cyan",
    rating: 3,
    definition: "Черты характера или поступки человека, указывающие на здоровые отношения с ним.",
    example: "Он никогда не перебивает — настоящий гринфлаг.",
    origin: "От англ. green flag — зелёный флаг, сигнал безопасности.",
    synonyms: "Хороший знак, положительная черта",
  },
  {
    word: "Дабл-ю",
    letter: "Д",
    tag: "Геймерский",
    tagColor: "cyan",
    rating: 2,
    definition: "Поздравление, одобрение или победа. В основном говорят стримеры и их зрители.",
    example: "Дабл-ю, команда! Отлично сыграли.",
    origin: "От англ. W — win, победа.",
    synonyms: "Победа, молодцы, хорошо сыграно",
  },
  {
    word: "Дед инсайд",
    letter: "Д",
    tag: "Эмоции",
    tagColor: "yellow",
    rating: 4,
    definition: "Состояние апатии, депрессии и безразличия к жизни; человек в таком состоянии.",
    example: "Понедельник, работа, дождь — я настоящий дед инсайд.",
    origin: "От англ. dead inside — мёртвый внутри.",
    synonyms: "Апатия, безразличие, опустошённость",
  },
  {
    word: "Дропнуть",
    letter: "Д",
    tag: "Действие",
    tagColor: "yellow",
    rating: 3,
    definition: "Выложить, опубликовать фото, трек или ссылку в публичный доступ.",
    example: "Я дропнул новый пост в телеграм.",
    origin: "От англ. drop — сбросить, выпустить.",
    synonyms: "Опубликовать, выложить, слить",
  },
  {
    word: "Душный",
    letter: "Д",
    tag: "Личность",
    tagColor: "yellow",
    rating: 5,
    definition: "Занудный, слишком правильный, надоедливый человек.",
    example: "Он такой душный — вечно придирается к каждому слову.",
    origin: "От слова «душно» — создаёт атмосферу дискомфорта.",
    synonyms: "Зануда, нудный, надоедливый",
  },
  {
    word: "Жиза",
    letter: "Ж",
    tag: "Юмор",
    tagColor: "pink",
    rating: 5,
    definition: "Ситуация, очень знакомая и понятная большинству; «жизненно».",
    example: "Забыть выключить утюг и вспомнить это на работе — жиза.",
    origin: "Сокращение от слова «жизненно».",
    synonyms: "Узнаваемо, в точку, как в жизни",
  },
  {
    word: "Задонатить",
    letter: "З",
    tag: "Геймерский",
    tagColor: "cyan",
    rating: 4,
    definition: "Сделать денежный взнос, пожертвовать или купить что-то в игре.",
    example: "Он задонатил на стримера и получил подписку.",
    origin: "От англ. donate — жертвовать, вносить деньги.",
    synonyms: "Пожертвовать, оплатить, купить",
  },
  {
    word: "Зашквар",
    letter: "З",
    tag: "Поведение",
    tagColor: "orange",
    rating: 4,
    definition: "Что-то позорное, устаревшее, вышедшее из моды; поступок, портящий репутацию.",
    example: "Носить такие штаны — это зашквар.",
    origin: "Жаргонное слово из уличной культуры.",
    synonyms: "Позор, стыд, несмываемый ляп",
  },
  {
    word: "Изи",
    letter: "И",
    tag: "Общение",
    tagColor: "cyan",
    rating: 4,
    definition: "Легко, просто — часто говорят после победы или лёгкого выполнения задачи.",
    example: "Сдал экзамен на пятёрку — изи.",
    origin: "От англ. easy — лёгкий, простой.",
    synonyms: "Легко, просто, без проблем",
  },
  {
    word: "Имба",
    letter: "И",
    tag: "Оценка",
    tagColor: "pink",
    rating: 4,
    definition: "Нечто потрясающе крутое или чрезмерно сильное. Пришло из киберспорта, теперь используют везде.",
    example: "Новый фильм Тарантино — такая имба, по-другому не скажешь.",
    origin: "От англ. imbalance — дисбаланс, превосходство.",
    synonyms: "Топ, крутяк, нечто мощное",
  },
  {
    word: "Кенселинг",
    letter: "К",
    tag: "Интернет",
    tagColor: "orange",
    rating: 3,
    definition: "Публичное осуждение и «отмена» личности или бренда за неприемлемые высказывания.",
    example: "Вы слышали, что сказал Макан на интервью? Предлагаю его кенселить.",
    origin: "От англ. cancel culture — культура отмены.",
    synonyms: "Отмена, бойкот, публичное осуждение",
  },
  {
    word: "Киннить",
    letter: "К",
    tag: "Интернет",
    tagColor: "yellow",
    rating: 1,
    definition: "Быть увлечённым кем-то, идентифицировать себя с персонажем или человеком.",
    example: "Я кинню этого певца, знаю все его песни.",
    origin: "От англ. kin — родственник, идентифицировать себя.",
    synonyms: "Фанатеть, увлекаться, отождествлять",
  },
  {
    word: "Кмк",
    letter: "К",
    tag: "Интернет",
    tagColor: "cyan",
    rating: 4,
    definition: "Сокращение фразы «как мне кажется».",
    example: "Я не понял новый альбом Кендрика. Он слишком сложный, кмк.",
    origin: "Русская интернет-аббревиатура.",
    synonyms: "Как мне кажется, по-моему, на мой взгляд",
  },
  {
    word: "Краш",
    letter: "К",
    tag: "Отношения",
    tagColor: "pink",
    rating: 5,
    definition: "Человек, который очень нравится; тайная или безответная влюблённость.",
    example: "Мой краш сегодня со мной поздоровался — я весь день счастлив.",
    origin: "От англ. crush — влюблённость, симпатия.",
    synonyms: "Симпатия, увлечение, тайная любовь",
  },
  {
    word: "Кринж",
    letter: "К",
    tag: "Эмоции",
    tagColor: "pink",
    rating: 5,
    definition: "Чувство сильной неловкости, стыда или дискомфорта при наблюдении за чьими-то действиями.",
    example: "Когда директор пытался танцевать на корпоративе — это был полный кринж.",
    origin: "От англ. cringe — съёживаться от стыда.",
    synonyms: "Позор, стыдоба, неловкость",
  },
  {
    word: "Крипово",
    letter: "К",
    tag: "Эмоции",
    tagColor: "orange",
    rating: 5,
    definition: "Что-то страшное, пугающее или жутковатое.",
    example: "Это видео очень криповое — смотрел ночью и пожалел.",
    origin: "От англ. creepy — жуткий, пугающий.",
    synonyms: "Жутко, страшно, пугающе",
  },
  {
    word: "Лейм",
    letter: "Л",
    tag: "Личность",
    tagColor: "yellow",
    rating: 2,
    definition: "Скучный, неинтересный, странный человек.",
    example: "Наш новый коллега — лейм, с ним не о чём говорить.",
    origin: "От англ. lame — слабый, скучный.",
    synonyms: "Скучный, неинтересный, унылый",
  },
  {
    word: "Лол",
    letter: "Л",
    tag: "Юмор",
    tagColor: "yellow",
    rating: 5,
    definition: "Обозначение смеха, «смешно».",
    example: "Он упал прямо в лужу — лол.",
    origin: "От англ. LOL — laughing out loud (громко смеюсь).",
    synonyms: "Ха-ха, смешно, прикол",
  },
  {
    word: "ЛП / ЛД",
    letter: "Л",
    tag: "Общение",
    tagColor: "pink",
    rating: 4,
    definition: "Лучшая подруга / лучший друг.",
    example: "Пошли с ЛП в кино, отличный вечер получился.",
    origin: "Русское сокращение от «лучшая подруга» и «лучший друг».",
    synonyms: "Лучший друг, бести, близкий человек",
  },
  {
    word: "Масик",
    letter: "М",
    tag: "Личность",
    tagColor: "pink",
    rating: 3,
    definition: "Стабильный, заботливый и ухоженный мужчина.",
    example: "Вчера на Патриках я познакомилась с масиком.",
    origin: "Ласкательное русское слово, популяризованное в соцсетях.",
    synonyms: "Надёжный мужчина, заботливый, ухоженный",
  },
  {
    word: "Мем",
    letter: "М",
    tag: "Интернет",
    tagColor: "cyan",
    rating: 5,
    definition: "Смешная картинка, видео или фраза, быстро распространяющаяся в интернете.",
    example: "Этот мем уже везде — видел его раз двадцать за день.",
    origin: "От англ. meme — единица культурной информации.",
    synonyms: "Картинка, прикол, вирусный контент",
  },
  {
    word: "Муд",
    letter: "М",
    tag: "Эмоции",
    tagColor: "yellow",
    rating: 5,
    definition: "Настроение или эмоциональное состояние.",
    example: "Мой муд сейчас — лежать на диване и не шевелиться.",
    origin: "От англ. mood — настроение.",
    synonyms: "Настроение, состояние, эмоции",
  },
  {
    word: "НПС / NPC",
    letter: "Н",
    tag: "Личность",
    tagColor: "orange",
    rating: 2,
    definition: "Человек без личности, живущий «по шаблону». Из игр — персонаж с ограниченным набором фраз.",
    example: "С ним не о чём разговаривать. Типичный NPC.",
    origin: "От англ. NPC — Non-Player Character (неиграбельный персонаж).",
    synonyms: "Серый человек, безликий, шаблонный",
  },
  {
    word: "Нормис",
    letter: "Н",
    tag: "Личность",
    tagColor: "cyan",
    rating: 4,
    definition: "Скучный человек, далёкий от мемов и гик-культуры. Вошло в шорт-лист «Слова года — 2024».",
    example: "Ты такой нормис. У тебя любимый фильм — «Интерстеллар».",
    origin: "От англ. normal — обычный, не в теме.",
    synonyms: "Обычный человек, не в теме, ванильный",
  },
  {
    word: "Нуб",
    letter: "Н",
    tag: "Геймерский",
    tagColor: "orange",
    rating: 5,
    definition: "Новичок, неопытный человек, который плохо разбирается в чём-либо.",
    example: "Ты полный нуб — даже не знаешь базовых правил игры.",
    origin: "От англ. newbie → noob — новенький.",
    synonyms: "Новичок, чайник, начинающий",
  },
  {
    word: "Овершеринг",
    letter: "О",
    tag: "Поведение",
    tagColor: "yellow",
    rating: 3,
    definition: "Стремление человека слишком откровенно делиться личной жизнью с окружающими.",
    example: "Она каждый день снимает тиктоки с мужем — чистый овершеринг.",
    origin: "От англ. oversharing — чрезмерное раскрытие.",
    synonyms: "Чрезмерная открытость, слишком много лишнего",
  },
  {
    word: "Окак",
    letter: "О",
    tag: "Юмор",
    tagColor: "pink",
    rating: 4,
    definition: "Мемное слово, выражающее удивление в неожиданных ситуациях.",
    example: "— Коллеги, презентация нужна к вечеру. — Окак.",
    origin: "Русский интернет-мем, искажение «okay».",
    synonyms: "Окей, понятно, ладно (с удивлением)",
  },
  {
    word: "Орать",
    letter: "О",
    tag: "Юмор",
    tagColor: "yellow",
    rating: 5,
    definition: "Очень сильно смеяться.",
    example: "Я ору с этого видео — пересмотрел уже пять раз.",
    origin: "Образное — смеяться так громко, что слышно всем.",
    synonyms: "Смеяться, ржать, хохотать",
  },
  {
    word: "Пикми",
    letter: "П",
    tag: "Поведение",
    tagColor: "yellow",
    rating: 1,
    definition: "Pick me girl — девушка, привлекающая внимание, подчёркивая свою «не такую, как все» натуру.",
    example: "Она опять говорит, что ей проще дружить с парнями — классическая пикми.",
    origin: "От англ. pick me — выбери меня.",
    synonyms: "Подлиза, угодница, «не как все»",
  },
  {
    word: "Пон",
    letter: "П",
    tag: "Интернет",
    tagColor: "cyan",
    rating: 4,
    definition: "«Понимаю», «понял» — мем-форма с прилагательными: «лютый пон», «депрессивный пон».",
    example: "— У нас завтра зачёт, так что сегодня не увидимся. — Депрессивный пон…",
    origin: "Интернет-мем, сокращение от «понял».",
    synonyms: "Понял, ясно, принято",
  },
  {
    word: "ПОВ",
    letter: "П",
    tag: "Интернет",
    tagColor: "cyan",
    rating: 3,
    definition: "Точка зрения. Формат видео от первого лица или описание ситуации глазами героя.",
    example: "ПОВ: на календаре 1 октября и ты готов смотреть «Сумерки».",
    origin: "От англ. POV — Point Of View (точка зрения).",
    synonyms: "С точки зрения, представь что ты…",
  },
  {
    word: "Пруф",
    letter: "П",
    tag: "Интернет",
    tagColor: "cyan",
    rating: 5,
    definition: "Доказательство — скриншот, ссылка или факт, подтверждающий слова.",
    example: "Говоришь, что выиграл — давай пруф!",
    origin: "От англ. proof — доказательство.",
    synonyms: "Доказательство, подтверждение, скриншот",
  },
  {
    word: "Редфлаг",
    letter: "Р",
    tag: "Отношения",
    tagColor: "orange",
    rating: 5,
    definition: "Признак потенциальной опасности или проблем в отношениях с человеком.",
    example: "Он всегда опаздывает на встречи — настоящий редфлаг.",
    origin: "От англ. red flag — красный флаг, сигнал опасности.",
    synonyms: "Тревожный знак, предупреждение, плохой сигнал",
  },
  {
    word: "Рейдж-байт",
    letter: "Р",
    tag: "Интернет",
    tagColor: "orange",
    rating: 1,
    definition: "Провокация, созданная специально для вызова бурной реакции ради вовлечённости.",
    example: "Санлайт написал, что закрывается. Я думаю, это был рейдж-байт.",
    origin: "От англ. rage bait — приманка для злости.",
    synonyms: "Провокация, хайп, намеренная ложь",
  },
  {
    word: "Рил ток",
    letter: "Р",
    tag: "Общение",
    tagColor: "pink",
    rating: 4,
    definition: "Серьёзный разговор, правда без прикрас.",
    example: "Рил ток: ты опаздываешь уже третий раз подряд.",
    origin: "От англ. real talk — серьёзный разговор.",
    synonyms: "Честно говоря, по правде, серьёзно",
  },
  {
    word: "Рофлить",
    letter: "Р",
    tag: "Юмор",
    tagColor: "cyan",
    rating: 4,
    definition: "Шутить, смеяться, прикалываться.",
    example: "Мы весь вечер рофлили над его историей.",
    origin: "От англ. ROFL — Rolling On the Floor Laughing.",
    synonyms: "Смеяться, прикалываться, шутить",
  },
  {
    word: "Свага",
    letter: "С",
    tag: "Стиль",
    tagColor: "cyan",
    rating: 3,
    definition: "Стиль, харизма, крутой образ — внешняя уверенность в себе.",
    example: "Как тебе мой образ? Свага присутствует?",
    origin: "Русифицированное англ. swag — стиль, крутость.",
    synonyms: "Стиль, харизма, крутость",
  },
  {
    word: "Сигма",
    letter: "С",
    tag: "Личность",
    tagColor: "cyan",
    rating: 3,
    definition: "Самодостаточный, сильный и независимый мужчина вне социальных иерархий.",
    example: "Патрик Бейтман — икона сигмы.",
    origin: "Из интернет-мемов о социальной иерархии: альфа → бета → сигма (вне системы).",
    synonyms: "Одиночка, независимый, волк-одиночка",
  },
  {
    word: "Скам",
    letter: "С",
    tag: "Интернет",
    tagColor: "orange",
    rating: 5,
    definition: "Мошенничество, обман в интернете.",
    example: "Не покупай там — это скам, возьмут деньги и пропадут.",
    origin: "От англ. scam — мошенничество.",
    synonyms: "Мошенничество, обман, развод",
  },
  {
    word: "Скипнуть",
    letter: "С",
    tag: "Действие",
    tagColor: "yellow",
    rating: 4,
    definition: "Пропустить, проигнорировать что-либо.",
    example: "Скипнул вступление фильма — там ничего важного.",
    origin: "От англ. skip — пропускать.",
    synonyms: "Пропустить, проигнорировать, миновать",
  },
  {
    word: "Скуф",
    letter: "С",
    tag: "Личность",
    tagColor: "orange",
    rating: 5,
    definition: "Неухоженный мужчина средних лет, который перестал за собой следить.",
    example: "Каждому скуфу — по альтушке.",
    origin: "Русский интернет-мем, иронично описывает опустившегося мужчину.",
    synonyms: "Неухоженный, запустивший себя",
  },
  {
    word: "Слэй",
    letter: "С",
    tag: "Оценка",
    tagColor: "pink",
    rating: 3,
    definition: "Восхищение кем-либо или чем-либо; выглядеть потрясающе. «Слэй-период» — лучший период жизни.",
    example: "Ты выглядишь просто слэй.",
    origin: "От англ. slay — убивать (в смысле «убивать наповал» своим видом).",
    synonyms: "Огонь, великолепно, на высоте",
  },
  {
    word: "Соевый",
    letter: "С",
    tag: "Личность",
    tagColor: "yellow",
    rating: 4,
    definition: "Мужчина, лишённый маскулинности и традиционных мужских качеств.",
    example: "Он не сможет тебя защитить, он соевый.",
    origin: "От англ. soy boy — мальчик-соя, недостаточно мужественный.",
    synonyms: "Изнеженный, мягкотелый, немужественный",
  },
  {
    word: "Соус",
    letter: "С",
    tag: "Стиль",
    tagColor: "cyan",
    rating: 3,
    definition: "Внутренняя уверенность, харизма и неповторимый стиль — синоним «свага».",
    example: "Чувак, ты сияешь. Покажи людям свой соус.",
    origin: "От англ. sauce — соус, вкус, особинка.",
    synonyms: "Харизма, стиль, уверенность",
  },
  {
    word: "Стейси",
    letter: "С",
    tag: "Личность",
    tagColor: "pink",
    rating: 1,
    definition: "Красивые и яркие девушки с низким интеллектом — стереотип из западной интернет-культуры.",
    example: "Я видела её новый пост. Она такая стейси.",
    origin: "Английское имя Stacy, ставшее мемом.",
    synonyms: "Яркая, поверхностная, популярная девушка",
  },
  {
    word: "Таскмаскинг",
    letter: "Т",
    tag: "Поведение",
    tagColor: "yellow",
    rating: 1,
    definition: "Имитация бурной деятельности — делать вид, что занят, не делая ничего по итогу.",
    example: "Видел итоги новенького за квартал? Это чистый таскмаскинг.",
    origin: "От англ. task masking — маскировка задач.",
    synonyms: "Имитация работы, видимость деятельности",
  },
  {
    word: "Тарелочница",
    letter: "Т",
    tag: "Поведение",
    tagColor: "orange",
    rating: 4,
    definition: "Человек, который ходит на свидания или в гости с целью поесть за чужой счёт.",
    example: "Она поела на 10 000 и сбежала — типичная тарелочница.",
    origin: "Русский интернет-мем из соцсетей.",
    synonyms: "Халявщик, нахлебник",
  },
  {
    word: "Темщик",
    letter: "Т",
    tag: "Поведение",
    tagColor: "yellow",
    rating: 2,
    definition: "Человек, ищущий лёгкие способы заработка. Темка — очередная схема быстрого дохода.",
    example: "Братан, темка новая есть. Сейчас расскажу.",
    origin: "Жаргонное слово из уличной культуры.",
    synonyms: "Делец, схемщик, хитрец",
  },
  {
    word: "Тильт",
    letter: "Т",
    tag: "Эмоции",
    tagColor: "orange",
    rating: 2,
    definition: "Сильное раздражение, потеря настроения или веры в себя. Пришло из покера и киберспорта.",
    example: "Я жёстко тильтую из-за его привычки перебивать.",
    origin: "От англ. tilt — наклон, потеря равновесия.",
    synonyms: "Раздражение, потеря самообладания",
  },
  {
    word: "Токсик",
    letter: "Т",
    tag: "Личность",
    tagColor: "orange",
    rating: 5,
    definition: "Человек, который создаёт негативную атмосферу и портит настроение окружающим.",
    example: "Не общайся с ним — он полный токсик, только нервы тратишь.",
    origin: "От англ. toxic — токсичный, ядовитый.",
    synonyms: "Негативный человек, вредитель, ядовитый",
  },
  {
    word: "Топовый",
    letter: "Т",
    tag: "Оценка",
    tagColor: "pink",
    rating: 5,
    definition: "Лучший, крутой, на высшем уровне.",
    example: "Это топовый ресторан — лучший, где я был.",
    origin: "От англ. top — вершина, лучший.",
    synonyms: "Лучший, крутой, отличный",
  },
  {
    word: "Треш",
    letter: "Т",
    tag: "Оценка",
    tagColor: "orange",
    rating: 5,
    definition: "Что-то очень плохое, ужасное, из ряда вон выходящее.",
    example: "М-да, этот день — просто трэш.",
    origin: "От англ. trash — мусор, дрянь.",
    synonyms: "Ужас, кошмар, провал",
  },
  {
    word: "Тюбик",
    letter: "Т",
    tag: "Личность",
    tagColor: "yellow",
    rating: 2,
    definition: "Инфантильный и эмоционально нестабильный молодой человек.",
    example: "Она опять встречается с каким-то тюбиком.",
    origin: "Русский интернет-мем.",
    synonyms: "Инфантильный, нестабильный, несерьёзный",
  },
  {
    word: "Ультануть",
    letter: "У",
    tag: "Действие",
    tagColor: "cyan",
    rating: 4,
    definition: "В неожиданный момент выдать всю накопленную силу или показать все умения.",
    example: "У меня не получалось, а потом я ультанул и заработал два миллиона за месяц.",
    origin: "От англ. ultimate — мощная суперспособность в играх.",
    synonyms: "Вложить всё, выдать максимум, показать силу",
  },
  {
    word: "Факап",
    letter: "Ф",
    tag: "Неудача",
    tagColor: "orange",
    rating: 5,
    definition: "Провал, неудача, серьёзная ошибка.",
    example: "Отправил не тот файл клиенту — настоящий факап.",
    origin: "От англ. fuck up — серьёзно облажаться.",
    synonyms: "Провал, ошибка, облом",
  },
  {
    word: "Фейк",
    letter: "Ф",
    tag: "Интернет",
    tagColor: "yellow",
    rating: 5,
    definition: "Подделка, неправда, ненастоящий человек или аккаунт в сети.",
    example: "Эта новость — стопроцентный фейк, не верь.",
    origin: "От англ. fake — ненастоящий, поддельный.",
    synonyms: "Ложь, подделка, фальшивка",
  },
  {
    word: "Флексить",
    letter: "Ф",
    tag: "Поведение",
    tagColor: "cyan",
    rating: 4,
    definition: "Хвастаться, демонстрировать достижения или вещи напоказ; танцевать под музыку.",
    example: "Купил новые кроссовки и весь день флексил перед одноклассниками.",
    origin: "От англ. flex — сгибать мышцы напоказ.",
    synonyms: "Хвастаться, выпендриваться, красоваться",
  },
  {
    word: "Флейм",
    letter: "Ф",
    tag: "Интернет",
    tagColor: "orange",
    rating: 3,
    definition: "Ожесточённый спор в интернете, переходящий на личности.",
    example: "В комментариях начался флейм — уже 300 сообщений ни о чём.",
    origin: "От англ. flame — пламя, огонь спора.",
    synonyms: "Срач, спор, перепалка",
  },
  {
    word: "Фрешмен",
    letter: "Ф",
    tag: "Музыка",
    tagColor: "pink",
    rating: 5,
    definition: "Молодой и набирающий популярность исполнитель или творческий деятель.",
    example: "Ты слышал нового инди-поп исполнителя? Он 100%-й фрешмен.",
    origin: "От англ. freshman — первокурсник, новичок.",
    synonyms: "Новое имя, начинающий исполнитель, восходящая звезда",
  },
  {
    word: "Хейтить",
    letter: "Х",
    tag: "Поведение",
    tagColor: "orange",
    rating: 5,
    definition: "Ненавидеть, резко критиковать, писать негативные комментарии.",
    example: "Зачем хейтить певца — просто не слушай его музыку.",
    origin: "От англ. hate — ненавидеть.",
    synonyms: "Ненавидеть, критиковать, травить",
  },
  {
    word: "Чекать",
    letter: "Ч",
    tag: "Действие",
    tagColor: "cyan",
    rating: 4,
    definition: "Проверять, смотреть, изучать информацию.",
    example: "Зачекай расписание — когда там следующий автобус?",
    origin: "От англ. to check — проверять.",
    synonyms: "Проверить, посмотреть, изучить",
  },
  {
    word: "Чилить",
    letter: "Ч",
    tag: "Действие",
    tagColor: "cyan",
    rating: 5,
    definition: "Отдыхать, расслабляться, ничего не делать.",
    example: "После экзаменов весь день чилил дома, смотрел сериалы.",
    origin: "От англ. chill — охлаждаться, успокаиваться.",
    synonyms: "Отдыхать, расслабляться, лениться",
  },
  {
    word: "Чиназес",
    letter: "Ч",
    tag: "Юмор",
    tagColor: "yellow",
    rating: 1,
    definition: "Бессмысленное, но модное выражение восторга. Вирусное слово из соцсетей.",
    example: "— У тебя сегодня всего две встречи. — О-о, чиназес!",
    origin: "Вирусный мем из TikTok и ВКонтакте.",
    synonyms: "Отлично, супер, ура (без смысла)",
  },
  {
    word: "Шипперить",
    letter: "Ш",
    tag: "Отношения",
    tagColor: "pink",
    rating: 3,
    definition: "Верить или представлять, что два человека или персонажа состоят в романтических отношениях.",
    example: "Фанаты давно шипперят этих двух актёров.",
    origin: "От англ. relationship → ship — поддерживать пару.",
    synonyms: "Болеть за пару, фантазировать об отношениях",
  },
  {
    word: "Юзать",
    letter: "Ю",
    tag: "Действие",
    tagColor: "yellow",
    rating: 4,
    definition: "Использовать что-либо.",
    example: "Я юзаю этот сервис уже год — очень удобно.",
    origin: "От англ. to use — использовать.",
    synonyms: "Использовать, применять, пользоваться",
  },
  {
    word: "Я в прайме",
    letter: "Я",
    tag: "Оценка",
    tagColor: "pink",
    rating: 5,
    definition: "Фраза, описывающая лучший период в жизни человека.",
    example: "Я закрыл все рабочие задачи. Я в прайме!",
    origin: "От англ. prime — пик, расцвет.",
    synonyms: "На пике, в лучшей форме, на подъёме",
  },
];

const LETTERS = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");

const TAG_COLORS: Record<string, string> = {
  pink: "bg-pink-500/15 text-pink-400 border border-pink-500/30",
  cyan: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30",
  yellow: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  orange: "bg-orange-500/15 text-orange-400 border border-orange-500/30",
};

export default function Index() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [openWord, setOpenWord] = useState<string | null>(null);

  const wordOfDay = SLANG_DATA.find((w) => w.isWordOfDay)!;

  const filtered = useMemo(() => {
    let list = SLANG_DATA;
    if (activeLetter) list = list.filter((w) => w.letter === activeLetter);
    if (search.trim())
      list = list.filter((w) =>
        w.word.toLowerCase().includes(search.toLowerCase())
      );
    return list;
  }, [search, activeLetter]);

  const availableLetters = new Set(SLANG_DATA.map((w) => w.letter));

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #ff2d9b, transparent)" }}
        />
        <div
          className="absolute top-1/3 -right-60 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #00f5d4, transparent)" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #ffe600, transparent)" }}
        />
      </div>

      {/* HEADER */}
      <header className="relative z-10 border-b border-border/50 backdrop-blur-sm sticky top-0 bg-background/80">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📖</span>
            <span className="font-display text-sm" style={{ fontWeight: 700 }}>
              <span className="neon-pink">Словарь</span>
              <span className="text-foreground/70"> для взрослых</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground font-body">
            <Icon name="BookOpen" size={14} />
            <span className="ml-1">{SLANG_DATA.length} слов в словаре</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 pb-24">
        {/* HERO */}
        <section className="pt-16 pb-12 text-center animate-slide-up">
          <div
            className="inline-block text-xs font-display font-semibold px-4 py-1.5 rounded-full mb-6 border"
            style={{
              color: "var(--neon-cyan)",
              borderColor: "rgba(0,245,212,0.3)",
              background: "rgba(0,245,212,0.08)",
            }}
          >
            🚀 Понимаем молодёжь с 2025
          </div>
          <h1
            className="font-display text-4xl md:text-6xl font-black leading-tight mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            Вы слышите{" "}
            <span className="neon-pink glow-pink">«кринж»</span>,{" "}
            <span className="neon-cyan">«сигма»</span>,{" "}
            <span className="neon-yellow">«пикми»</span>
            <br />и не понимаете?
          </h1>
          <p className="text-muted-foreground text-lg font-body max-w-2xl mx-auto mb-10">
            Этот сайт — ваш надёжный переводчик. Объясняем популярные слова понятно, с примерами и историей.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <Icon
              name="Search"
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Введите слово, которое вас интересует..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveLetter(null);
              }}
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-card border border-border/60 text-foreground placeholder-muted-foreground font-body text-base outline-none focus:border-pink-500/60 transition-all"
              style={{ boxShadow: "none" }}
            />
          </div>
        </section>

        {/* WORD OF THE DAY */}
        <section className="mb-16 animate-fade-in">
          <div
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,45,155,0.12) 0%, rgba(0,245,212,0.08) 100%)",
              border: "1px solid rgba(255,45,155,0.25)",
            }}
          >
            <div
              className="absolute top-4 right-6 text-8xl font-display font-black opacity-5 pointer-events-none select-none"
              style={{ lineHeight: 1 }}
            >
              {wordOfDay.word}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">⭐</span>
              <span className="font-display text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                Слово дня
              </span>
            </div>

            <div className="flex flex-wrap items-start gap-4 mb-4">
              <div>
                <h2
                  className="font-display text-5xl font-black neon-pink"
                  style={{ lineHeight: 1 }}
                >
                  {wordOfDay.word}
                </h2>
                {wordOfDay.rating !== undefined && (
                  <div className="flex items-center gap-0.5 mt-2">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className="text-base" style={{ color: s <= wordOfDay.rating ? "var(--neon-yellow)" : "rgba(255,255,255,0.15)" }}>★</span>
                    ))}
                    <span className="text-sm text-muted-foreground ml-2 font-body">Говорят все</span>
                  </div>
                )}
              </div>
              <span
                className={`mt-2 text-xs px-3 py-1 rounded-full font-body font-semibold ${TAG_COLORS[wordOfDay.tagColor]}`}
              >
                {wordOfDay.tag}
              </span>
            </div>

            <p className="text-foreground/80 font-body text-lg mb-4 max-w-2xl">
              {wordOfDay.definition}
            </p>

            <div
              className="rounded-xl p-4 mb-4"
              style={{
                background: "rgba(255,255,255,0.04)",
                borderLeft: "3px solid var(--neon-pink)",
              }}
            >
              <p className="text-muted-foreground font-body italic">
                «{wordOfDay.example}»
              </p>
            </div>

            <div className="flex flex-wrap gap-6 text-sm font-body">
              <div>
                <span className="text-muted-foreground">Происхождение: </span>
                <span className="text-foreground/80">{wordOfDay.origin}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Синонимы: </span>
                <span className="text-foreground/80">{wordOfDay.synonyms}</span>
              </div>
            </div>
          </div>
        </section>

        {/* DICTIONARY */}
        <section>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h2 className="font-display text-2xl font-bold">
              📚 Словарь сленга
            </h2>
            {activeLetter && (
              <button
                onClick={() => setActiveLetter(null)}
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                <Icon name="X" size={14} />
                Сбросить фильтр
              </button>
            )}
          </div>

          {/* Alphabet */}
          <div className="flex flex-wrap gap-1 mb-8">
            {LETTERS.map((l) => (
              <button
                key={l}
                onClick={() => setActiveLetter(activeLetter === l ? null : l)}
                disabled={!availableLetters.has(l)}
                className={`letter-btn w-8 h-8 rounded-lg text-xs font-display font-bold transition-all disabled:opacity-20 disabled:cursor-not-allowed ${
                  activeLetter === l ? "active" : "text-muted-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground font-body">
              <span className="text-5xl block mb-4">🤔</span>
              Такого слова пока нет в словаре
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item) => (
                <div
                  key={item.word}
                  className="rounded-2xl p-5 bg-card border border-border/60 cursor-pointer transition-all card-glow"
                  onClick={() =>
                    setOpenWord(openWord === item.word ? null : item.word)
                  }
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-display text-xl font-bold neon-pink">
                        {item.word}
                      </h3>
                      {item.rating !== undefined && (
                        <div className="flex items-center gap-0.5 mt-1">
                          {[1,2,3,4,5].map((s) => (
                            <span key={s} className="text-xs" style={{ color: s <= item.rating ? "var(--neon-yellow)" : "rgba(255,255,255,0.15)" }}>★</span>
                          ))}
                          <span className="text-xs text-muted-foreground ml-1 font-body">{item.rating}/5</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-body font-semibold ${TAG_COLORS[item.tagColor]}`}
                      >
                        {item.tag}
                      </span>
                      <Icon
                        name={openWord === item.word ? "ChevronUp" : "ChevronDown"}
                        size={16}
                        className="text-muted-foreground"
                      />
                    </div>
                  </div>

                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {item.definition}
                  </p>

                  {openWord === item.word && (
                    <div className="mt-4 space-y-3 animate-fade-in border-t border-border/40 pt-4">
                      <div
                        className="rounded-xl p-3"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          borderLeft: "2px solid var(--neon-cyan)",
                        }}
                      >
                        <p className="text-sm font-body italic text-foreground/70">
                          «{item.example}»
                        </p>
                      </div>
                      <div className="text-xs font-body space-y-1.5">
                        <div>
                          <span className="text-muted-foreground">Откуда: </span>
                          <span className="text-foreground/80">{item.origin}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Синонимы: </span>
                          <span className="text-foreground/80">{item.synonyms}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-border/40 py-8 text-center text-muted-foreground text-sm font-body">
        <p>
          <span className="neon-pink font-semibold">Словарь для взрослых</span> — понимаем молодёжь вместе
        </p>
      </footer>
    </div>
  );
}