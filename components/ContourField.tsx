export function ContourField() {
  return (
    <div className="contour-field" aria-hidden="true">
      <svg viewBox="0 0 1000 1000" role="presentation">
        <g className="contour-lines">
          <path d="M506 123C656 110 822 220 850 380C878 537 773 735 616 826C453 920 238 845 160 685C80 522 136 315 276 203C348 145 430 130 506 123Z" />
          <path d="M505 168C631 158 769 251 798 389C828 527 741 690 604 773C462 858 289 799 213 666C136 531 178 355 298 255C359 203 435 176 505 168Z" />
          <path d="M504 215C607 205 716 277 744 397C773 516 703 650 589 716C472 785 334 746 267 641C197 531 227 395 324 310C375 265 441 222 504 215Z" />
          <path d="M501 263C581 254 667 303 692 405C719 507 666 604 577 659C484 717 379 690 323 616C266 539 282 434 352 367C394 327 449 269 501 263Z" />
          <path d="M500 314C559 304 618 335 638 412C659 488 621 565 557 605C492 647 422 632 378 582C335 530 337 460 386 411C420 376 461 320 500 314Z" />
          <path className="contour-core" d="M493 361C535 350 574 372 588 423C603 474 579 523 536 551C491 581 450 569 420 540C391 510 389 467 420 435C442 412 468 368 493 361Z" />
        </g>
      </svg>
      <span className="coordinate coordinate-a">N 31°13′17″</span>
      <span className="coordinate coordinate-b">E 121°28′</span>
      <span className="coordinate coordinate-c">± 0.000 / SITE DATUM</span>
      <span className="fyl-glyph"><i>F</i><i>Y</i><i>L</i></span>
    </div>
  );
}
