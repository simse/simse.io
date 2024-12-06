export interface DecisionInput {
  url: URL
  userAgent: string
  referrer?: string
}

export type Flag = 'UWU_ENABLED' | 'HIGHLIGHT_YOUTUBE';

export interface Decision {
  navbar: {
    title: string
  }
  hero?: {
    title: string;
    subtitle: string;
  }
  flags: Flag[]
}

export const personalise = (input: DecisionInput): Decision => {
    let decision: Decision = {
        navbar: {
            title: 'Simon Sorensen'
        },
        flags: []
    }

    // check for uwu
    if (input.url.searchParams.has("uwu")) {
        decision.flags.push("UWU_ENABLED")

        decision.hero = {
          title: "Hewwo fwiends!! >w<",
          subtitle: "Pwease make youwself comfy-womfy in my adowabwu digital home! uwu ✧"
        }
    }

    return decision
}
