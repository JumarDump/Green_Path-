document.addEventListener("DOMContentLoaded", function () {

    /* MOBILE NAVIGATION */

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", function () {
            const isOpen = navigation.classList.toggle("active");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
            });
        });

        document.addEventListener("click", function (event) {
            if (
                navigation.classList.contains("active") &&
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navigation.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation");
            }
        });
    }

    /* Years */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* To the top again  */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        backToTop.addEventListener("click", function (event) {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* Learn more */

    const topicModal = document.getElementById("topicModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalCategory = document.getElementById("modalCategory");
    const modalDescription = document.getElementById("modalDescription");
    const modalAction = document.getElementById("modalAction");
    const modalClose = document.getElementById("modalClose");
    const modalDone = document.getElementById("modalDone");
    const modalBackdrop = document.getElementById("modalBackdrop");

    const topicDetails = {
        climate: {
            category: "CLIMATE",
            title: "Climate Change",
            description:
                "Climate change is a long-term shift in temperatures and weather patterns. Human activities, particularly burning fossil fuels, have increased greenhouse gas concentrations and contributed to global warming. Its effects can include rising temperatures, changing rainfall, and increased risks from some extreme weather events.",
            action:
                "Use energy efficiently, consider lower-emission transportation, reduce unnecessary consumption, and support responsible climate solutions."
        },

        plastic: {
            category: "WASTE",
            title: "Plastic Pollution",
            description:
                "Plastic pollution occurs when plastic waste enters natural environments and accumulates on land and in waterways. Some plastic breaks into smaller pieces and can remain in the environment for a long time.",
            action:
                "Choose reusable products when practical, sort waste correctly, follow local recycling rules, and never leave rubbish in public places or natural habitats."
        },

        forest: {
            category: "FORESTS",
            title: "Deforestation",
            description:
                "Deforestation is the removal of forests for land conversion, development, agriculture, and other uses. Losing forests can destroy habitats, expose soil to erosion, and affect the carbon and water cycles.",
            action:
                "Reduce avoidable waste, support responsible forest management, protect existing trees, and join well-managed local restoration projects."
        },

        biodiversity: {
            category: "WILDLIFE",
            title: "Biodiversity",
            description:
                "Biodiversity is the variety of life on Earth, from genes and species to ecosystems. It supports processes such as pollination, nutrient cycling, and the stability of natural environments.",
            action:
                "Respect wildlife, protect natural habitats, avoid releasing non-native species, and support evidence-based conservation efforts."
        }
    };

    function openTopic(topicKey) {
        const topic = topicDetails[topicKey];

        if (!topic || !topicModal) return;

        modalCategory.textContent = topic.category;
        modalTitle.textContent = topic.title;
        modalDescription.textContent = topic.description;
        modalAction.textContent = topic.action;

        topicModal.classList.add("active");
        topicModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        if (modalClose) modalClose.focus();
    }

    function closeTopic() {
        if (!topicModal) return;

        topicModal.classList.remove("active");
        topicModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }

    document.querySelectorAll(".learn-more").forEach(function (button) {
        button.addEventListener("click", function () {
            openTopic(button.dataset.topic);
        });
    });

    if (modalClose) modalClose.addEventListener("click", closeTopic);
    if (modalDone) modalDone.addEventListener("click", closeTopic);
    if (modalBackdrop) modalBackdrop.addEventListener("click", closeTopic);

    /* aCtion list */

    const checklist = document.getElementById("checklist");
    const actionScore = document.getElementById("actionScore");
    const actionProgress = document.getElementById("actionProgress");
    const actionMessage = document.getElementById("actionMessage");

    function updateChecklist() {
        if (!checklist) return;

        const checkboxes = checklist.querySelectorAll('input[type="checkbox"]');
        const total = checkboxes.length;
        const completed = checklist.querySelectorAll(
            'input[type="checkbox"]:checked'
        ).length;

        const percentage = total > 0 ? (completed / total) * 100 : 0;

        if (actionScore) {
            actionScore.textContent = `${completed} / ${total} completed`;
        }

        if (actionProgress) {
            actionProgress.style.width = `${percentage}%`;
        }

        if (actionMessage) {
            if (completed === total && total > 0) {
                actionMessage.textContent =
                    "Great work! You have completed every action on this checklist.";
            } else if (completed >= 4) {
                actionMessage.textContent =
                    "Great progress! Keep practicing these sustainable habits.";
            } else if (completed > 0) {
                actionMessage.textContent =
                    "Every step counts. Keep going at your own pace.";
            } else {
                actionMessage.textContent =
                    "Start with one small action today.";
            }
        }
    }

    if (checklist) {
        checklist.querySelectorAll('input[type="checkbox"]').forEach(function (box) {
            box.addEventListener("change", updateChecklist);
        });

        updateChecklist();
    }

    /* Donation revenue  */

    const donationTotalElement = document.getElementById("donationTotal");
    const supporterCountElement = document.getElementById("supporterCount");
    const donationPercentElement = document.getElementById("donationPercent");
    const donationProgress = document.getElementById("donationProgress");
    const customAmount = document.getElementById("customAmount");
    const donateButton = document.getElementById("donateButton");
    const donationMessage = document.getElementById("donationMessage");
    const amountButtons = document.querySelectorAll(".amount-button");

    const donationGoal = 100000;
    let donationTotal = 38500;
    let supporterCount = 128;
    let selectedAmount = 0;

    const pesoFormatter = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        maximumFractionDigits: 0
    });

    function updateDonationDisplay() {
        const percentage = Math.min(
            (donationTotal / donationGoal) * 100,
            100
        );

        if (donationTotalElement) {
            donationTotalElement.textContent =
                pesoFormatter.format(donationTotal);
        }

        if (supporterCountElement) {
            supporterCountElement.textContent =
                supporterCount.toLocaleString("en-PH");
        }

        if (donationPercentElement) {
            donationPercentElement.textContent = `${percentage.toFixed(1)}%`;
        }

        if (donationProgress) {
            donationProgress.style.width = `${percentage}%`;
        }
    }

    amountButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            selectedAmount = Number(button.dataset.amount) || 0;

            amountButtons.forEach(function (item) {
                item.classList.remove("selected");
            });

            button.classList.add("selected");

            if (customAmount) {
                customAmount.value = selectedAmount;
            }

            if (donationMessage) {
                donationMessage.textContent = "";
            }
        });
    });

    if (customAmount) {
        customAmount.addEventListener("input", function () {
            selectedAmount = Number(customAmount.value) || 0;

            amountButtons.forEach(function (button) {
                button.classList.toggle(
                    "selected",
                    Number(button.dataset.amount) === selectedAmount
                );
            });
        });
    }

    if (donateButton) {
        donateButton.addEventListener("click", function () {
            const amount = Number(customAmount?.value) || selectedAmount;

            if (!Number.isFinite(amount) || amount <= 0) {
                if (donationMessage) {
                    donationMessage.textContent =
                        "Please enter or select a valid amount.";
                }
                return;
            }

            if (amount > 1000000) {
                if (donationMessage) {
                    donationMessage.textContent =
                        "For this demo, the maximum contribution is ₱1,000,000.";
                }
                return;
            }

            donationTotal += amount;
            supporterCount += 1;

            updateDonationDisplay();

            if (donationMessage) {
                donationMessage.textContent =
                    `Demo contribution of ${pesoFormatter.format(amount)} added. No payment was made.`;
            }

            selectedAmount = 0;

            if (customAmount) customAmount.value = "";

            amountButtons.forEach(function (button) {
                button.classList.remove("selected");
            });
        });
    }

    updateDonationDisplay();

    /* Contacts */

    const contactMessage = document.getElementById("contactMessage");
    const characterCount = document.getElementById("characterCount");

    if (contactMessage && characterCount) {
        function updateCharacterCount() {
            characterCount.textContent = contactMessage.value.length;
        }

        contactMessage.addEventListener("input", updateCharacterCount);
        updateCharacterCount();
    }

    /* CONTACT FORM DEMO */

    const contactForm = document.getElementById("contactForm");
    const contactFeedback = document.getElementById("contactFeedback");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            if (contactFeedback) {
                contactFeedback.textContent =
                    "Your form passed the demo validation. It has not been sent to a server.";
            }

            contactForm.reset();

            if (characterCount) {
                characterCount.textContent = "0";
            }
        });
    }

    /* This is complicated zoom part seperate itd */

    const zoomViewer = document.getElementById("imageZoomViewer");
    const zoomStage = document.getElementById("zoomStage");
    const zoomedImage = document.getElementById("zoomedImage");
    const zoomClose = document.getElementById("zoomClose");
    const zoomInButton = document.getElementById("zoomIn");
    const zoomOutButton = document.getElementById("zoomOut");
    const zoomResetButton = document.getElementById("zoomReset");

    if (
        zoomViewer && zoomStage && zoomedImage &&
        zoomClose && zoomInButton && zoomOutButton && zoomResetButton
    ) {
        let zoom = 1;
        let startDistance = 0;
        let startZoom = 1;
        let lastTapTime = 0;
        let previousOverflow = "";
        let previousFocus = null;
        let touchStartX = 0;
        let touchStartY = 0;
        let touchStartScrollLeft = 0;
        let touchStartScrollTop = 0;
        let dragging = false;

        const MIN_ZOOM = 1;
        const MAX_ZOOM = 4;
        const ZOOM_STEP = 0.25;

        function getFitSize() {
            const imageWidth = zoomedImage.naturalWidth || 1;
            const imageHeight = zoomedImage.naturalHeight || 1;
            const stageWidth = zoomStage.clientWidth || 1;
            const stageHeight = zoomStage.clientHeight || 1;

            const fitScale = Math.min(
                stageWidth / imageWidth,
                stageHeight / imageHeight,
                1
            );

            return {
                width: imageWidth * fitScale,
                height: imageHeight * fitScale
            };
        }

        function renderZoom(keepCenter = false) {
            if (!zoomedImage.src) return;

            const oldCenterX =
                (zoomStage.scrollLeft + zoomStage.clientWidth / 2);
            const oldCenterY =
                (zoomStage.scrollTop + zoomStage.clientHeight / 2);

            const oldScrollWidth = zoomStage.scrollWidth;
            const oldScrollHeight = zoomStage.scrollHeight;

            const fit = getFitSize();

            zoomedImage.style.maxWidth = "none";
            zoomedImage.style.maxHeight = "none";
            zoomedImage.style.width = `${fit.width * zoom}px`;
            zoomedImage.style.height = `${fit.height * zoom}px`;

            requestAnimationFrame(function () {
                if (keepCenter) {
                    const centerRatioX = oldScrollWidth > 0
                        ? oldCenterX / oldScrollWidth
                        : 0.5;

                    const centerRatioY = oldScrollHeight > 0
                        ? oldCenterY / oldScrollHeight
                        : 0.5;

                    zoomStage.scrollLeft = Math.max(
                        0,
                        centerRatioX * zoomStage.scrollWidth -
                        zoomStage.clientWidth / 2
                    );

                    zoomStage.scrollTop = Math.max(
                        0,
                        centerRatioY * zoomStage.scrollHeight -
                        zoomStage.clientHeight / 2
                    );
                } else if (zoom === 1) {
                    zoomStage.scrollLeft = 0;
                    zoomStage.scrollTop = 0;
                }
            });
        }

        function setZoom(newZoom, keepCenter = true) {
            zoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom));
            renderZoom(keepCenter);
        }

        function resetZoom() {
            zoom = 1;

            if (zoomedImage.complete && zoomedImage.naturalWidth) {
                renderZoom(false);
            } else {
                zoomedImage.style.width = "auto";
                zoomedImage.style.height = "auto";
                zoomedImage.style.maxWidth = "100%";
                zoomedImage.style.maxHeight = "100%";
            }

            zoomStage.scrollLeft = 0;
            zoomStage.scrollTop = 0;
        }

        function openImageViewer(image) {
            previousFocus = document.activeElement;
            previousOverflow = document.body.style.overflow;

            zoomedImage.src = image.currentSrc || image.src;
            zoomedImage.alt = image.alt || "Enlarged environmental image";

            zoom = 1;
            zoomViewer.classList.add("active");
            zoomViewer.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";

            resetZoom();
            zoomClose.focus();
        }

        function closeImageViewer() {
            zoomViewer.classList.remove("active");
            zoomViewer.setAttribute("aria-hidden", "true");
            document.body.style.overflow = previousOverflow;

            zoomedImage.removeAttribute("src");
            zoomedImage.alt = "";
            zoom = 1;

            zoomStage.scrollLeft = 0;
            zoomStage.scrollTop = 0;

            if (previousFocus && typeof previousFocus.focus === "function") {
                previousFocus.focus();
            }
        }

        document.querySelectorAll(".infographic-image img").forEach(function (image) {
            image.style.cursor = "zoom-in";
            image.setAttribute("tabindex", "0");
            image.setAttribute("role", "button");
            image.setAttribute(
                "aria-label",
                `Open enlarged image: ${image.alt || "environmental image"}`
            );

            image.addEventListener("click", function () {
                openImageViewer(image);
            });

            image.addEventListener("keydown", function (event) {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openImageViewer(image);
                }
            });
        });

        zoomedImage.addEventListener("load", function () {
            resetZoom();
        });

        zoomInButton.addEventListener("click", function () {
            setZoom(zoom + ZOOM_STEP);
        });

        zoomOutButton.addEventListener("click", function () {
            setZoom(zoom - ZOOM_STEP);
        });

        zoomResetButton.addEventListener("click", resetZoom);
        zoomClose.addEventListener("click", closeImageViewer);

        zoomViewer.addEventListener("click", function (event) {
            if (event.target === zoomViewer) {
                closeImageViewer();
            }
        });

        /* Mouse wheel zoom */
        zoomStage.addEventListener("wheel", function (event) {
            if (!zoomViewer.classList.contains("active")) return;

            event.preventDefault();

            const direction = event.deltaY < 0 ? 1 : -1;
            setZoom(zoom + direction * 0.15);
        }, { passive: false });

        /* Mobile pinch-to-zoom */
        function distanceBetweenTouches(touch1, touch2) {
            const dx = touch1.clientX - touch2.clientX;
            const dy = touch1.clientY - touch2.clientY;

            return Math.sqrt(dx * dx + dy * dy);
        }

        zoomStage.addEventListener("touchstart", function (event) {
            if (event.touches.length === 2) {
                startDistance = distanceBetweenTouches(
                    event.touches[0],
                    event.touches[1]
                );

                startZoom = zoom;
                dragging = false;
            } else if (event.touches.length === 1 && zoom > 1) {
                touchStartX = event.touches[0].clientX;
                touchStartY = event.touches[0].clientY;
                touchStartScrollLeft = zoomStage.scrollLeft;
                touchStartScrollTop = zoomStage.scrollTop;
                dragging = true;
            }
        }, { passive: true });

        zoomStage.addEventListener("touchmove", function (event) {
            if (event.touches.length === 2 && startDistance > 0) {
                event.preventDefault();

                const currentDistance = distanceBetweenTouches(
                    event.touches[0],
                    event.touches[1]
                );

                const scale = currentDistance / startDistance;
                setZoom(startZoom * scale, false);
            } else if (event.touches.length === 1 && dragging && zoom > 1) {
                const touch = event.touches[0];

                const dx = touchStartX - touch.clientX;
                const dy = touchStartY - touch.clientY;

                zoomStage.scrollLeft = touchStartScrollLeft + dx;
                zoomStage.scrollTop = touchStartScrollTop + dy;
            }
        }, { passive: false });

        zoomStage.addEventListener("touchend", function (event) {
            if (event.touches.length < 2) {
                startDistance = 0;
            }

            if (event.touches.length === 0) {
                dragging = false;
            }
        });

        /* Double-click / double-tap to zoom */
        zoomStage.addEventListener("dblclick", function (event) {
            if (zoom === 1) {
                setZoom(2);
            } else {
                resetZoom();
            }
        });

        zoomStage.addEventListener("touchend", function (event) {
            if (event.changedTouches.length !== 1) return;

            const now = Date.now();

            if (now - lastTapTime < 300) {
                if (zoom === 1) {
                    setZoom(2);
                } else {
                    resetZoom();
                }

                lastTapTime = 0;
            } else {
                lastTapTime = now;
            }
        });

        /* Keyboard controls */
        document.addEventListener("keydown", function (event) {
            if (!zoomViewer.classList.contains("active")) return;

            if (event.key === "Escape") {
                closeImageViewer();
            } else if (event.key === "+" || event.key === "=") {
                setZoom(zoom + ZOOM_STEP);
            } else if (event.key === "-") {
                setZoom(zoom - ZOOM_STEP);
            } else if (event.key === "0") {
                resetZoom();
            }
        });

        window.addEventListener("resize", function () {
            if (zoomViewer.classList.contains("active") && zoom === 1) {
                renderZoom(false);
            }
        });
    }

});