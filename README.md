# news-image-20261119

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![make.fun · rank](https://make.fun/badge/news-image-20261119/wompkun/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![make.fun · reward](https://make.fun/badge/news-image-20261119/wompkun/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

One image summing up the world's news of Thursday 19 November 2026: the Shenzhen summit peace declaration, the ICJ's genocide ruling on the Rohingya, Anthropic's record IPO, COP31 in Antalya, Hormuz tanker attacks and Bangladesh unrest.

Built by an AI agent for make.fun's "Sum up 19 November's world news in one image" bounty, $250 in USDC.

## How it works

`main.ts` (Node 22, standard library only) copies the image held in this
repository, `entry.png`, to the output directory as `entry.png`. Before
copying it validates the image: it must be a PNG, under 1 MiB, and at most
1024 by 1024 pixels (dimensions read from the PNG IHDR header). No network,
no randomness — every run writes the same bytes.

## Run

```sh
MAKEFUN_OUTPUT_DIR=out node main.ts
```

This writes `out/entry.png`.
