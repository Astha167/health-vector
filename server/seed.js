require('dotenv').config();
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
const User = require('./models/User');

const blogPosts = [
  {
    title: 'The Science of Sleep: Why 7–9 Hours Isn\'t Just a Number',
    slug: 'science-of-sleep',
    category: 'Physical',
    author: 'Dr. Priya Sharma',
    readTime: 6,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800',
    excerpt: 'Sleep deprivation has been linked to 36 different chronic diseases. Learn what happens in your body during the 4 critical sleep stages and why skimping on sleep is a health emergency.',
    tags: ['sleep', 'physical health', 'recovery'],
    content: `
# The Science of Sleep: Why 7–9 Hours Isn't Just a Number

Sleep is the foundation of physical wellness, yet 60% of urban Indians report sleeping less than 6 hours per night. This isn't just tiredness — it's a silent health crisis.

## What Happens When You Sleep

Sleep isn't a passive state. Your body is running a full maintenance programme across 4 critical stages:

**Stage 1 (NREM 1) — Light Sleep**
Heart rate slows, muscles relax, body temperature drops. This is the entry point and lasts only 5–10 minutes.

**Stage 2 (NREM 2) — Core Sleep**
Memory consolidation begins. The brain "replays" events from the day, moving them from short-term to long-term storage. This stage accounts for ~50% of your total sleep.

**Stage 3 (NREM 3) — Deep Sleep**
Growth hormone is released. Tissue repair, immune function, and cellular restoration happen here. Skipping this stage means physical recovery doesn't happen.

**Stage 4 (REM Sleep) — Dream Sleep**
Emotional processing, creativity, and problem-solving are consolidated. REM sleep is when your brain practices emotional regulation.

## The Numbers Don't Lie

- **36 chronic conditions** have been linked to chronic sleep deprivation (including Type 2 diabetes, cardiovascular disease, obesity)
- After just **17 hours awake**, cognitive impairment equals a 0.05% blood alcohol level
- Sleeping less than 6 hours per night increases all-cause mortality risk by **13%**

## The Ayurvedic Perspective

In Ayurveda, sleep (called *Nidra*) is one of the three pillars of health (*Trayopastambha*). The optimal sleep window is **10 PM to 6 AM**, which aligns with Kapha dosha's dominance — a state of stillness and regeneration.

**Vata types** may struggle with light, interrupted sleep and benefit most from consistent bedtime rituals.
**Pitta types** often can't "switch off" and need digital detox before bed.
**Kapha types** tend to over-sleep and need morning stimulation to counter grogginess.

## Practical Sleep Optimisation

1. **Set a fixed wake time** — even on weekends. Circadian rhythm is anchored to wake time, not bedtime.
2. **No screens 60 minutes before bed** — blue light suppresses melatonin secretion
3. **Keep your bedroom cool (18–20°C)** — body temperature must drop to initiate deep sleep
4. **Avoid caffeine after 2 PM** — caffeine's half-life is 5–6 hours
5. **4-7-8 breathing technique** — inhale for 4 counts, hold for 7, exhale for 8

Start tracking your sleep score on VitaMetrics to see how sleep quality correlates with your overall wellness index.
    `,
  },
  {
    title: 'Understanding Anxiety: When Your Brain\'s Alarm System Gets Stuck',
    slug: 'understanding-anxiety',
    category: 'Mental',
    author: 'Dr. Rahul Mehta',
    readTime: 7,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800',
    excerpt: 'Anxiety affects 1 in 5 Indians. Understanding the neuroscience behind your worry response is the first step to managing it effectively.',
    tags: ['anxiety', 'mental health', 'neuroscience'],
    content: `
# Understanding Anxiety: When Your Brain's Alarm System Gets Stuck

Anxiety is the most common mental health condition in India, affecting over 200 million people — yet 83% never seek help. The stigma begins with misunderstanding: anxiety isn't weakness; it's your brain's threat-detection system operating in overdrive.

## The Neuroscience of Anxiety

At the centre of anxiety is the **amygdala** — an almond-shaped structure in your brain that processes threats. When you perceive danger (real or imagined), the amygdala triggers the fight-or-flight response:

- **Cortisol and adrenaline** flood your system
- Heart rate and breathing increase
- Digestion slows down
- Muscles tense

This response evolved to protect you from predators. The problem? Your brain can't tell the difference between a tiger and a difficult email.

## The Anxiety Spiral

Anxiety feeds on itself through a predictable pattern:

**Trigger → Thought → Physical sensation → Avoidance → Increased anxiety**

When you avoid something that triggers anxiety (a presentation, a social event), you get short-term relief — but long-term, avoidance teaches your brain that the situation was genuinely dangerous. The anxiety grows.

## Evidence-Based Management Strategies

### 1. Box Breathing (4-4-4-4)
Inhale for 4 counts, hold for 4, exhale for 4, hold for 4. This directly activates the parasympathetic nervous system and counters the fight-or-flight response within **90 seconds**.

### 2. Cognitive Defusion (ACT Technique)
Instead of "I am anxious," say "I notice I'm having the thought that I'm anxious." This creates psychological distance from anxious thoughts.

### 3. Progressive Muscle Relaxation
Systematically tense and release each muscle group from toes to head. This exploits the physiological law: a muscle can't be simultaneously tense and relaxed.

### 4. The 5-4-3-2-1 Grounding Technique
Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. This anchors you in the present, pulling you out of catastrophic future thinking.

## The Ayurvedic Understanding

In Ayurveda, anxiety is understood as aggravated **Vata dosha** — excessive air and space element creating instability. Grounding practices (warm oil massage, warm foods, fixed routines) are prescribed to bring Vata back into balance.

**Ashwagandha** (*Withania somnifera*), used for centuries in Ayurveda, has now been validated in multiple clinical trials to reduce cortisol levels by up to 28%.

## When to Seek Help

If anxiety is interfering with daily functioning for more than 2 weeks, seeking professional support is not weakness — it's wisdom. Cognitive Behavioural Therapy (CBT) has a 60–80% success rate for generalised anxiety disorder.

Your VitaMetrics Mental Index tracks your anxiety levels over time. If you notice a consistent pattern of low mental scores, use the booking feature to schedule a consultation.
    `,
  },
  {
    title: 'Prakriti: The Ancient Science of Knowing Your Body Type',
    slug: 'prakriti-guide',
    category: 'Holistic',
    author: 'Vaidya Anita Kulkarni',
    readTime: 8,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    excerpt: 'Ayurveda\'s 5,000-year-old system of constitutional typing (Prakriti) offers personalised health insights that modern medicine is only beginning to validate.',
    tags: ['ayurveda', 'prakriti', 'holistic', 'body type'],
    content: `
# Prakriti: The Ancient Science of Knowing Your Body Type

In 600 BCE, the physician Charaka wrote in the *Charaka Samhita* that no two individuals are alike, and therefore no two treatment plans should be alike. This was personalised medicine 2,600 years before genomics.

The concept he described was **Prakriti** — your inherent constitutional type, determined at the moment of conception and remaining stable throughout your life.

## The Three Doshas

Ayurveda identifies three primary biological energies (*doshas*) that govern all physiological and psychological functions:

### Vata (Air + Space)
**Characteristics:** Light, mobile, dry, irregular, creative, quick-thinking
**In balance:** Energetic, enthusiastic, creative, adaptable
**Out of balance:** Anxious, scattered, constipated, insomniac, underweight

**Vata types** typically have a lean, thin frame, dry skin, and variable appetite. They learn quickly but forget quickly. They thrive on routine but often struggle to maintain it.

### Pitta (Fire + Water)
**Characteristics:** Sharp, focused, intense, hot, competitive, precise
**In balance:** Intelligent, decisive, direct, transformational
**Out of balance:** Irritable, inflammable (gut and skin issues), perfectionist, burnt out

**Pitta types** typically have a medium frame, oily or combination skin, and a sharp appetite. They're natural leaders with strong digestion. They excel under pressure but can tip into aggression or burnout.

### Kapha (Earth + Water)
**Characteristics:** Stable, heavy, slow, nurturing, patient, loyal
**In balance:** Calm, strong, compassionate, excellent memory
**Out of balance:** Lethargic, heavy, possessive, resistant to change, prone to weight gain

**Kapha types** typically have a larger, more solid frame, smooth skin, and a slow but reliable metabolism. They're the most emotionally stable but need external stimulation to maintain energy.

## Most People Are Dual-Doshic

While everyone has a dominant Prakriti, most people are dual-doshic (*Dvandvaja*):
- **Vata-Pitta:** Creative and competitive, high achievers prone to burnout and anxiety
- **Pitta-Kapha:** Focused and stable, natural leaders with risk of stubbornness
- **Vata-Kapha:** Creative and nurturing, may struggle with self-discipline and scattered energy

## Prakriti and Modern Genetics

A landmark 2015 study in the *Journal of Translational Medicine* mapped 3,416 individuals across all three Prakriti types to their genetic profiles. **Distinct SNP (single nucleotide polymorphism) patterns** were found to correlate with Prakriti type, particularly for genes governing metabolism, immunity, and stress response.

Ancient observation and modern genetics are converging.

## Living According to Your Prakriti

**For Vata:**
- Follow fixed meal and sleep times
- Eat warm, oily, nourishing foods (avoid raw salads, cold drinks)
- Practice grounding exercises: yoga, gentle walking
- Abhyanga (warm oil self-massage) before bathing

**For Pitta:**
- Avoid excess spicy, sour, or salty foods
- Prioritise cooling activities (swimming, evening walks)
- Practice sheetali pranayama (cooling breath)
- Schedule downtime — Pitta types often forget to rest

**For Kapha:**
- Eat light, spicy, dry foods (avoid dairy, sweets, heavy grains)
- Vigorous morning exercise is essential
- Vary routines and seek new experiences
- Wake before sunrise to counter morning heaviness

## Finding Your Prakriti

The VitaMetrics Prakriti assessment (Q26–Q35) analyses 10 constitutional markers to identify your dominant dosha. This informs your personalised recommendation plan, including diet, lifestyle, and exercise guidance tailored to your constitutional type.
    `,
  },
  {
    title: 'Emotional Regulation: The Skill That Changes Everything',
    slug: 'emotional-regulation',
    category: 'Emotional',
    author: 'Dr. Sneha Joshi',
    readTime: 6,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1484627147104-f5197bcd6651?w=800',
    excerpt: 'Emotional intelligence (EQ) predicts life satisfaction better than IQ. Here\'s the neuroscience behind emotion regulation and 5 techniques that actually work.',
    tags: ['emotional intelligence', 'regulation', 'wellbeing'],
    content: `
# Emotional Regulation: The Skill That Changes Everything

Daniel Goleman's landmark 1995 research showed that **EQ (Emotional Quotient) predicts life satisfaction, relationship quality, and professional success better than IQ** in most domains. Yet emotional regulation is never formally taught in schools.

Here's what the science says — and what you can do about it.

## What Is Emotional Regulation?

Emotional regulation is your ability to:
1. **Identify** what you're feeling (with precision, not just "bad")
2. **Understand** why you're feeling it
3. **Modulate** the intensity of the emotion
4. **Express** it appropriately

This is not suppression. Suppression (pushing emotions down) is associated with hypertension, weakened immunity, and worse relationship outcomes. Regulation is about processing, not avoiding.

## The Neuroscience: Prefrontal Cortex vs Amygdala

Your brain has two key players in emotional experience:

- **Amygdala:** Fast, instinctive, emotional. Triggers fear, anger, excitement.
- **Prefrontal cortex (PFC):** Slow, deliberate, rational. Evaluates, plans, decides.

When stress is high, the amygdala "hijacks" the PFC — this is why you say things you regret when angry. Emotional regulation techniques essentially help you keep your PFC online when the amygdala wants to take over.

## 5 Evidence-Based Regulation Techniques

### 1. Affect Labeling
Simply naming your emotion reduces its intensity. Research by UCLA's Mat Lieberman showed that saying (or writing) "I feel angry" reduces amygdala activity by measurable amounts. The act of labeling shifts processing from amygdala to PFC.

*Practice: Keep a 2-minute emotion journal every evening. Name the emotion precisely — not just "sad" but "disappointed," "grieving," "lonely."*

### 2. Cognitive Reappraisal
Change how you interpret a situation, not the situation itself. Instead of "I failed this presentation," try "This is data on what to improve." Reappraisal has the highest evidence base of any regulation strategy.

### 3. Opposite Action (from DBT)
When an emotion urges a counterproductive behaviour, do the opposite. Shame urges hiding — so reach out. Fear urges avoidance — so approach (safely). This directly rewires the emotion-behaviour association.

### 4. RAIN Technique (Mindfulness-Based)
- **R**ecognize what you're feeling
- **A**llow it to be there without judgment
- **I**nvestigate it with curiosity (where do you feel it in your body?)
- **N**urture yourself with compassion

### 5. Physiological Sigh
Double inhale through the nose (short inhale, then a second top-up inhale to fully inflate the lungs), then a long, slow exhale. This is the fastest known way to downregulate the nervous system — used by Navy SEALs and now validated in a 2023 Stanford study.

## The Ayurvedic Emotional Framework

Ayurveda identifies seven positive emotional states (*Sattva*) and tracks their disruption through dosha imbalance. Emotional wellbeing is described as the balance of *Sattva* (clarity), *Rajas* (passion), and *Tamas* (inertia).

Daily *Sattvic* practices — meditation, gratitude, spending time in nature — are prescribed to build the emotional "ground" from which effective regulation becomes natural rather than effortful.

## Building Your Emotional Fitness

Like physical fitness, emotional fitness is built through consistent, progressive practice. Your VitaMetrics Emotional Index tracks mood stability, relationship quality, sense of purpose, and regulation capacity — giving you a data-informed view of your emotional health over time.
    `,
  },
  {
    title: 'Breathwork: Why Your Breath Is Your Most Powerful Health Tool',
    slug: 'breathwork-guide',
    category: 'Holistic',
    author: 'Yogacharya Ravi Nair',
    readTime: 5,
    published: true,
    coverImage: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800',
    excerpt: 'You breathe 20,000 times a day — mostly wrong. Modern research is finally validating what yogis knew for millennia: breath controls your biology.',
    tags: ['breathwork', 'pranayama', 'stress', 'holistic'],
    content: `
# Breathwork: Why Your Breath Is Your Most Powerful Health Tool

You will breathe approximately **670 million times** in your lifetime. Yet most people never pay attention to a single one of those breaths. This is a profound missed opportunity.

The ancient yogic texts called breath the bridge between the conscious and unconscious mind — the only autonomic (automatic) function you can also control deliberately. Modern neuroscience has confirmed that this control has measurable effects on stress, cognition, cardiovascular health, and immune function.

## The Anatomy of a Breath

Most people are chest breathers — shallow, rapid, and thoracic. Optimal breathing is **diaphragmatic**:

1. The diaphragm (the dome-shaped muscle below your lungs) contracts downward
2. The abdomen expands outward
3. The lungs fill from the bottom up, maximising gas exchange
4. The exhale is longer than the inhale, activating the vagus nerve

Chest breathing activates the sympathetic nervous system (stress). Diaphragmatic breathing activates the parasympathetic system (rest and digest).

## The Vagus Nerve: Your Reset Button

80% of the fibres in the vagus nerve run **upward** — from body to brain. Your breath is the fastestway to send a "calm down" signal to the amygdala via the vagus nerve.

Every extended exhale stimulates vagal tone. This is why slow, deep breathing reduces anxiety — it's literally sending a safety signal to your threat-detection system.

## Four Evidence-Based Breathwork Techniques

### 1. Box Breathing (Square Breathing)
**4-4-4-4:** Inhale 4 counts → Hold 4 → Exhale 4 → Hold 4

Used by US Navy SEALs before operations. Activates the parasympathetic system within 2–3 cycles. Ideal for acute stress moments.

### 2. 4-7-8 Breathing (Dr. Andrew Weil)
Inhale 4 counts → Hold 7 → Exhale 8

Extended hold builds CO2 tolerance; extended exhale maximises vagal stimulation. Ideal before sleep — clinical trials show onset of sleep can be reduced from 20+ minutes to under 7.

### 3. Physiological Sigh (Dr. Andrew Huberman / Stanford)
Double-inhale through nose (short + top-up) → Long exhale through mouth

This is the fastest-acting breathwork intervention known. One cycle reduces physiological arousal more rapidly than any other technique. Use when you feel overwhelmed or panicked.

### 4. Nadi Shodhana (Alternate Nostril Breathing)
Close right nostril → Inhale left nostril → Close both → Exhale right nostril → Inhale right → Close both → Exhale left. Repeat 10 cycles.

This ancient pranayama balances left and right brain hemispheres and has been shown to improve HRV (heart rate variability) — a key marker of autonomic nervous system health.

## Breathwork and Prakriti

**Vata types** benefit most from slow, warming breath retentions (*kumbhaka*) that increase warmth and stability.
**Pitta types** benefit from cooling pranayamas like Sheetali and Chandra Bhedana (left nostril breathing).
**Kapha types** benefit from stimulating Kapalabhati (rapid breath of fire) to counter morning sluggishness.

## Starting Your Practice

Begin with just **5 minutes** of box breathing each morning before checking your phone. Track how your stress levels change in your VitaMetrics Mental Index over 4 weeks. The data will speak for itself.

The breath is the only tool in your possession that is always with you, always free, and always available. Use it.
    `,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vitametrics');
    console.log('✅ Connected to MongoDB');

    // Seed blog posts
    const existingPosts = await BlogPost.countDocuments();
    if (existingPosts === 0) {
      await BlogPost.insertMany(blogPosts);
      console.log(`✅ Seeded ${blogPosts.length} blog posts`);
    } else {
      console.log(`ℹ️  Blog posts already exist (${existingPosts}), skipping seed`);
    }

    // Create a test admin user
    const adminExists = await User.findOne({ email: 'admin@vitametrics.com' });
    if (!adminExists) {
      await User.create({
        name: 'VitaMetrics Admin',
        email: 'admin@vitametrics.com',
        password: 'Admin@123',
        role: 'admin',
        age: 30,
        gender: 'Other',
        occupation: 'Platform Administrator',
      });
      console.log('✅ Admin user created: admin@vitametrics.com / Admin@123');
    }

    // Create a test regular user
    const testUserExists = await User.findOne({ email: 'test@vitametrics.com' });
    if (!testUserExists) {
      await User.create({
        name: 'Test User',
        email: 'test@vitametrics.com',
        password: 'Test@123',
        role: 'user',
        age: 28,
        gender: 'Male',
        occupation: 'Software Engineer',
      });
      console.log('✅ Test user created: test@vitametrics.com / Test@123');
    }

    console.log('\n🌱 Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedDB();
