{
  description = "Expo development environment with stable nixpkgs";

  # Flake inputs
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/5629520edecb69630a3f4d17d3d33fc96c13f6fe";
  };

  # Flake outputs
  outputs = {
    self,
    nixpkgs,
  }: let
    # Define supported systems
    allSystems = [
      "x86_64-linux"
      "aarch64-linux"
      "x86_64-darwin"
      "aarch64-darwin"
    ];

    # Define helper to generate system-specific attributes
    forAllSystems = f:
      nixpkgs.lib.genAttrs allSystems (system:
        f {
          pkgs = import nixpkgs { inherit system; };
        });
  in {
    # Create development shells for each supported system
    devShells = forAllSystems ({ pkgs }: {
      default = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs
          pkgs.git
        ];

        shellHook = ''
          echo "Expo development environment ready."
        '';
      };
    });
  };
}
