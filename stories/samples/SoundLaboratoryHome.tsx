import type { ReactNode } from "react";
import { Button, Card } from "../../src/index";
import {
  SOUND_LAB_FAQ_ITEMS,
  SOUND_LAB_FOOTER,
  SOUND_LAB_LATEST_ITEMS,
  SOUND_LAB_MEDIA_ITEMS,
  SOUND_LAB_PROJECT_ITEMS,
  SOUND_LAB_SECTIONS,
  SOUND_LAB_SNS_ITEMS,
} from "./sound-laboratory-home-content";

function SystemOnlineIndicator() {
  return (
    <div className="slt-sample-lp__system-online" aria-label="システム稼働中">
      <span className="slt-sample-lp__system-online-dot" aria-hidden="true" />
      <span className="slt-sample-lp__system-online-label slt-sample-typo--mono">
        SYSTEM ONLINE
      </span>
    </div>
  );
}

function SectionCardShell({
  eyebrow,
  title,
  description,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <article className="slt-sample-lp__section-card">
      <header className="slt-sample-lp__section-card-head">
        <div>
          <p className="slt-sample-lp__section-card-eyebrow slt-sample-typo--eyebrow">
            {eyebrow}
          </p>
          <h2 className="slt-sample-lp__section-card-title slt-sample-typo--section-title">
            {title}
          </h2>
          {subtitle ? (
            <h3 className="slt-sample-lp__section-card-subtitle slt-sample-typo--subsection">
              {subtitle}
            </h3>
          ) : null}
          {description ? (
            <p className="slt-sample-lp__section-card-lede slt-sample-typo--section-lede">
              {description}
            </p>
          ) : null}
        </div>
        <SystemOnlineIndicator />
      </header>
      <div className="slt-sample-lp__section-card-body">{children}</div>
    </article>
  );
}

/** 公式 sound-laboratory.org ホーム構成（Storybook 専用） */
export function SoundLaboratoryHome() {
  const { latest, social, media, projects, faq } = SOUND_LAB_SECTIONS;

  return (
    <div className="slt-sample-lp__container slt-sample-lp__home-sections">
      <section id={latest.id} className="slt-sample-lp__section" aria-labelledby="sl-latest-title">
        <SectionCardShell
          eyebrow={latest.eyebrow}
          title={latest.title}
          description={latest.description}
        >
          <ul className="slt-sample-lp__content-list">
            {SOUND_LAB_LATEST_ITEMS.map((item) => (
              <li key={item.title} className="slt-sample-lp__content-item">
                <Card>
                  <p className="slt-sample-typo--caption">{item.category}</p>
                  <h3 className="slt-sample-lp__card-title slt-sample-typo--card-title">
                    {item.title}
                  </h3>
                  <p className="slt-sample-lp__card-body slt-sample-typo--caption">{item.meta}</p>
                </Card>
              </li>
            ))}
          </ul>
        </SectionCardShell>
      </section>

      <section id={social.id} className="slt-sample-lp__section" aria-labelledby="sl-social-title">
        <SectionCardShell
          eyebrow={social.eyebrow}
          title={social.title}
          description={social.description}
          subtitle={social.subtitle}
        >
          <ul className="slt-sample-lp__content-list">
            {SOUND_LAB_SNS_ITEMS.map((item) => (
              <li key={item.title} className="slt-sample-lp__content-item">
                <Card>
                  <h3 className="slt-sample-lp__card-title slt-sample-typo--card-title">
                    {item.title}
                  </h3>
                  <p className="slt-sample-lp__card-body slt-sample-typo--card-body">
                    {item.description}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </SectionCardShell>
      </section>

      <section id={media.id} className="slt-sample-lp__section" aria-labelledby="sl-media-title">
        <SectionCardShell
          eyebrow={media.eyebrow}
          title={media.title}
          description={media.description}
        >
          <ul className="slt-sample-lp__content-list">
            {SOUND_LAB_MEDIA_ITEMS.map((item) => (
              <li key={item.title} className="slt-sample-lp__content-item">
                <Card>
                  <h3 className="slt-sample-lp__card-title slt-sample-typo--card-title">
                    {item.title}
                  </h3>
                  <p className="slt-sample-lp__card-body slt-sample-typo--card-body">
                    {item.description}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </SectionCardShell>
      </section>

      <section
        id={projects.id}
        className="slt-sample-lp__section"
        aria-labelledby="sl-projects-title"
      >
        <SectionCardShell
          eyebrow={projects.eyebrow}
          title={projects.title}
          description={projects.description}
        >
          <ul className="slt-sample-lp__content-list">
            {SOUND_LAB_PROJECT_ITEMS.map((item) => (
              <li key={item.title} className="slt-sample-lp__content-item">
                <Card>
                  <h3 className="slt-sample-lp__card-title slt-sample-typo--card-title">
                    {item.title}
                  </h3>
                  <p className="slt-sample-lp__card-body slt-sample-typo--caption">
                    {item.subtitle}
                  </p>
                  <p className="slt-sample-lp__card-body slt-sample-typo--card-body">
                    {item.description}
                  </p>
                  <Button variant="ghost">詳細を見る</Button>
                </Card>
              </li>
            ))}
          </ul>
        </SectionCardShell>
      </section>

      <section id={faq.id} className="slt-sample-lp__section" aria-labelledby="sl-faq-title">
        <SectionCardShell eyebrow={faq.eyebrow} title={faq.title}>
          <ul className="slt-sample-lp__faq-list">
            {SOUND_LAB_FAQ_ITEMS.map((item) => (
              <li key={item.question} className="slt-sample-lp__faq-item">
                <Card>
                  <h3 className="slt-sample-typo--faq-q">{item.question}</h3>
                  <p className="slt-sample-lp__card-body slt-sample-typo--card-body">
                    {item.answer}
                  </p>
                </Card>
              </li>
            ))}
          </ul>
        </SectionCardShell>
      </section>

      <section id="contact" className="slt-sample-lp__section" aria-labelledby="sl-contact-title">
        <SectionCardShell eyebrow="CONTACT" title="お問い合わせ">
          <p className="slt-sample-typo--section-lede slt-sample-lp__footer-contact">
            {SOUND_LAB_FOOTER.contactLabel}:{" "}
            <a href={`mailto:${SOUND_LAB_FOOTER.email}`}>{SOUND_LAB_FOOTER.email}</a>
          </p>
          <p className="slt-sample-lp__card-body slt-sample-typo--card-body">
            {SOUND_LAB_FOOTER.operator}
          </p>
        </SectionCardShell>
      </section>
    </div>
  );
}

export function SoundLaboratoryFooter() {
  return (
    <footer className="slt-sample-lp__footer">
      <div className="slt-sample-lp__container slt-sample-typo--footer">
        <p className="slt-sample-lp__footer-contact">
          {SOUND_LAB_FOOTER.contactLabel}:{" "}
          <a href={`mailto:${SOUND_LAB_FOOTER.email}`}>{SOUND_LAB_FOOTER.email}</a>
        </p>
        <p>{SOUND_LAB_FOOTER.operator}</p>
        <p>{SOUND_LAB_FOOTER.copyright}</p>
        <p className="slt-sample-lp__footer-legal">{SOUND_LAB_FOOTER.legal}</p>
      </div>
    </footer>
  );
}
