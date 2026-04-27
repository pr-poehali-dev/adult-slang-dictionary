import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";

const SLANG_DATA = [
  {
    word: "Агриться",
    letter: "А",
    tag: "Эмоции",
    tagColor: "orange",
    definition: "Злиться, раздражаться, проявлять агрессию.",
    example: "Не агрись из-за каждой мелочи — это просто игра.",
    origin: "От англ. aggro/aggression — агрессия.",
    synonyms: "Злиться, нервничать, заводиться",
  },
  {
    word: "Апать",
    letter: "А",
    tag: "Геймерский",
    tagColor: "cyan",
    definition: "Поднимать уровень чего-либо (например, в игре), улучшать.",
    example: "Нужно апнуть персонажа до максимального уровня.",
    origin: "От англ. up — поднимать.",
    synonyms: "Улучшать, прокачивать, повышать",
  },
  {
    word: "Байтить",
    letter: "Б",
    tag: "Поведение",
    tagColor: "yellow",
    definition: "Копировать чей-то стиль, идею или поведение; провоцировать.",
    example: "Он явно байтит — специально пишет provocating, чтобы вызвать реакцию.",
    origin: "От англ. bait — приманка, провокация.",
    synonyms: "Провоцировать, копировать, дразнить",
  },
  {
    word: "Бомбить",
    letter: "Б",
    tag: "Эмоции",
    tagColor: "orange",
    definition: "Сильно злиться или расстраиваться из-за чего-либо.",
    example: "У меня просто бомбит от того, как он себя ведёт.",
    origin: "Образное — как взрыв эмоций внутри.",
    synonyms: "Бесить, злить, раздражать",
  },
  {
    word: "Бро",
    letter: "Б",
    tag: "Общение",
    tagColor: "cyan",
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
    definition: "Атмосфера, настроение, ощущение от места, человека или события.",
    example: "На этом кафе крутой вайб — приятно и спокойно.",
    origin: "От англ. vibe — вибрация, атмосфера.",
    synonyms: "Атмосфера, настроение, дух места",
  },
  {
    word: "Го",
    letter: "Г",
    tag: "Общение",
    tagColor: "cyan",
    definition: "Пойдём, давай — призыв к действию.",
    example: "Го гулять после школы?",
    origin: "От англ. go — идти, давай.",
    synonyms: "Пойдём, давай, поехали",
  },
  {
    word: "Дед инсайд",
    letter: "Д",
    tag: "Эмоции",
    tagColor: "yellow",
    definition: "Состояние апатии, депрессии и безразличия к жизни; человек в таком состоянии.",
    example: "Понедельник, работа, дождь — я настоящий дед инсайд.",
    origin: "От англ. dead inside — мёртвый внутри.",
    synonyms: "Апатия, безразличие, опустошённость",
  },
  {
    word: "Душный",
    letter: "Д",
    tag: "Личность",
    tagColor: "yellow",
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
    definition: "Ситуация, которая очень знакома и понятна большинству; «жизненно».",
    example: "Забыть выключить утюг и вспомнить это на работе — жиза.",
    origin: "Сокращение от слова «жизненно».",
    synonyms: "Узнаваемо, в точку, как в жизни",
  },
  {
    word: "Задонатить",
    letter: "З",
    tag: "Геймерский",
    tagColor: "cyan",
    definition: "Сделать денежный взнос, пожертвовать или купить что-то в игре.",
    example: "Он задонатил на стример и получил подписку.",
    origin: "От англ. donate — жертвовать, вносить деньги.",
    synonyms: "Пожертвовать, оплатить, купить",
  },
  {
    word: "Зашквар",
    letter: "З",
    tag: "Поведение",
    tagColor: "orange",
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
    definition: "Легко, просто — часто говорят после победы или лёгкого выполнения задачи.",
    example: "Сдал экзамен на пятёрку — изи.",
    origin: "От англ. easy — лёгкий, простой.",
    synonyms: "Легко, просто, без проблем",
  },
  {
    word: "Краш",
    letter: "К",
    tag: "Отношения",
    tagColor: "pink",
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
    definition: "Чувство сильной неловкости, стыда или дискомфорта при наблюдении за чьими-то действиями.",
    example: "Когда директор пытался танцевать на корпоративе — это был полный кринж.",
    origin: "От англ. cringe — съёживаться от стыда.",
    synonyms: "Позор, стыдоба, неловкость",
    isWordOfDay: true,
  },
  {
    word: "Лол",
    letter: "Л",
    tag: "Юмор",
    tagColor: "yellow",
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
    definition: "Лучшая подруга / лучший друг.",
    example: "Пошли с ЛП в кино, отличный вечер получился.",
    origin: "Русское сокращение от «лучшая подруга» и «лучший друг».",
    synonyms: "Лучший друг, лучшая подруга, близкий человек",
  },
  {
    word: "Мем",
    letter: "М",
    tag: "Интернет",
    tagColor: "cyan",
    definition: "Смешная картинка, видео или фраза, быстро распространяющаяся в интернете.",
    example: "Этот мем уже везде — видел его раз двадцать за день.",
    origin: "От англ. meme — единица культурной информации.",
    synonyms: "Картинка, прикол, вирусный контент",
  },
  {
    word: "Нуб",
    letter: "Н",
    tag: "Геймерский",
    tagColor: "orange",
    definition: "Новичок, неопытный человек, который плохо разбирается в чём-либо.",
    example: "Ты полный нуб — даже не знаешь базовых правил игры.",
    origin: "От англ. newbie → noob — новенький.",
    synonyms: "Новичок, чайник, начинающий",
  },
  {
    word: "Орать",
    letter: "О",
    tag: "Юмор",
    tagColor: "yellow",
    definition: "Очень сильно смеяться.",
    example: "Я ору с этого видео — пересмотрел уже пять раз.",
    origin: "Образное — смеяться так, что слышно как ор.",
    synonyms: "Смеяться, ржать, хохотать",
  },
  {
    word: "Пруф",
    letter: "П",
    tag: "Интернет",
    tagColor: "cyan",
    definition: "Доказательство — скриншот, ссылка или факт, подтверждающий слова.",
    example: "Говоришь, что выиграл — давай пруф!",
    origin: "От англ. proof — доказательство.",
    synonyms: "Доказательство, подтверждение, скриншот",
  },
  {
    word: "Рил ток",
    letter: "Р",
    tag: "Общение",
    tagColor: "pink",
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
    definition: "Шутить, смеяться, прикалываться.",
    example: "Мы весь вечер рофлили над его историей.",
    origin: "От англ. ROFL — Rolling On the Floor Laughing.",
    synonyms: "Смеяться, прикалываться, шутить",
  },
  {
    word: "Скам",
    letter: "С",
    tag: "Интернет",
    tagColor: "orange",
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
    definition: "Пропустить, проигнорировать что-либо.",
    example: "Скипнул вступление фильма — там ничего важного.",
    origin: "От англ. skip — пропускать.",
    synonyms: "Пропустить, проигнорировать, миновать",
  },
  {
    word: "Топовый",
    letter: "Т",
    tag: "Оценка",
    tagColor: "pink",
    definition: "Лучший, крутой, на высшем уровне.",
    example: "Это топовый ресторан — лучший, где я был.",
    origin: "От англ. top — вершина, лучший.",
    synonyms: "Лучший, крутой, отличный",
  },
  {
    word: "Токсик",
    letter: "Т",
    tag: "Личность",
    tagColor: "orange",
    definition: "Человек, который создаёт негативную атмосферу, критикует и портит настроение другим.",
    example: "Не общайся с ним — он полный токсик, только нервы тратишь.",
    origin: "От англ. toxic — токсичный, ядовитый.",
    synonyms: "Негативный человек, вредитель, отравитель",
  },
  {
    word: "Факап",
    letter: "Ф",
    tag: "Неудача",
    tagColor: "orange",
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
    definition: "Ожесточённый спор в интернете, переходящий на личности.",
    example: "В комментариях начался флейм — уже 300 сообщений ни о чём.",
    origin: "От англ. flame — пламя, огонь спора.",
    synonyms: "Срач, спор, перепалка",
  },
  {
    word: "Хейтить",
    letter: "Х",
    tag: "Поведение",
    tagColor: "orange",
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
    definition: "Отдыхать, расслабляться, ничего не делать.",
    example: "После экзаменов весь день чилил дома, смотрел сериалы.",
    origin: "От англ. chill — охлаждаться, успокаиваться.",
    synonyms: "Отдыхать, расслабляться, лениться",
  },
  {
    word: "Шипперить",
    letter: "Ш",
    tag: "Отношения",
    tagColor: "pink",
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
    definition: "Использовать что-либо.",
    example: "Я юзаю этот сервис уже год — очень удобно.",
    origin: "От англ. to use — использовать.",
    synonyms: "Использовать, применять, пользоваться",
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
              <h2
                className="font-display text-5xl font-black neon-pink"
                style={{ lineHeight: 1 }}
              >
                {wordOfDay.word}
              </h2>
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
                    <h3 className="font-display text-xl font-bold neon-pink">
                      {item.word}
                    </h3>
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